import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ExamPageStudent = () => {
  const { courseId } = useParams();

  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingExamDetails, setLoadingExamDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch list of exams by course
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoadingExams(true);
        const res = await apiService.get(`/api/show_exam_by_course/${courseId}`);
        const examsArray = Array.isArray(res) ? res : res?.data ? [res.data] : [];
        setExams(examsArray || []);
      } catch (err) {
        console.error("Error fetching exams:", err);
        setExams([]);
      } finally {
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, [courseId]);

  // Fetch selected exam details
  useEffect(() => {
    if (!selectedExam) return;
    const loadExam = async () => {
      try {
        setLoadingExamDetails(true);
        const res = await apiService.get(`/api/show_exam/${selectedExam.id}`);
        const examObj = res?.data || res;
        setExamDetails(examObj || null);
        setCurrentQuestionIndex(0);
        setAnswers({});
      } catch (err) {
        console.error("Error fetching exam details:", err);
        setExamDetails(null);
      } finally {
        setLoadingExamDetails(false);
      }
    };
    loadExam();
  }, [selectedExam]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const submitAnswer = async (questionId, selectedOptionId) => {
    try {
      setSubmitting(true);
      await apiService.post(`/api/store_exam_answer`, {
        question_id: questionId,
        selected_option_id: selectedOptionId,
      });
    } catch (err) {
      console.error("Failed to submit answer:", err);
      alert("Failed to submit answer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    const question = examDetails.questions[currentQuestionIndex];
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) {
      alert("Please select an option before proceeding.");
      return;
    }

    await submitAnswer(question.id, selectedOptionId);

    if (currentQuestionIndex < examDetails.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("You have completed all questions. Click Submit Exam to finish.");
    }
  };

  const handleSubmitExam = async () => {
    const question = examDetails.questions[currentQuestionIndex];
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) {
      alert("Please select an option before submitting.");
      return;
    }

    await submitAnswer(question.id, selectedOptionId);
    alert("Exam submitted successfully!");
    setSelectedExam(null);
    setExamDetails(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  if (loadingExams) return <div className="page"><Header /><div style={{ padding: 20 }}>Loading exams…</div><Footer /></div>;

  if (!selectedExam) {
    return (
      <div className="page">
        <Header />
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
          <h1 className="text-2xl font-bold mb-6">Course Exams</h1>
          {exams.length === 0 ? (
            <p>No exams available for this course.</p>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition mb-4"
                onClick={() => setSelectedExam(exam)}
              >
                <h2 className="text-xl font-semibold">{exam.title}</h2>
                <p>{exam.description}</p>
                <p className="text-sm text-gray-500 mt-2">Duration: {exam.duration_minutes} mins</p>
              </div>
            ))
          )}
        </div>
        <Footer />
      </div>
    );
  }

  if (loadingExamDetails || !examDetails) {
    return <div className="page"><Header /><div style={{ padding: 20 }}>Loading exam details…</div><Footer /></div>;
  }

  const question = examDetails.questions[currentQuestionIndex];

  return (
    <div className="page">
      <Header />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-bold mb-2">{examDetails.title}</h2>
        <p className="mb-4 text-gray-700">{examDetails.description}</p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">{question.question_text} ({question.mark} pts)</h3>
          {question.options.map((opt) => (
            <label key={opt.id} className="block border p-2 rounded mb-2 cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt.id}
                checked={answers[question.id] === opt.id}
                onChange={() => handleOptionSelect(question.id, opt.id)}
                className="mr-2"
              />
              {opt.option_text}
            </label>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          {currentQuestionIndex < examDetails.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Next Question"}
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              disabled={submitting}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {examDetails.questions.length}
        </p>

        <button
          onClick={() => {
            setSelectedExam(null);
            setExamDetails(null);
            setCurrentQuestionIndex(0);
            setAnswers({});
          }}
          className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
        >
          Back to Exams
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ExamPageStudent;
