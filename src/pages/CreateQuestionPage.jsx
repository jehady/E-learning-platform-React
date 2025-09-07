import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../utils/api";

const CreateQuestionPage = () => {
  const { examId } = useParams();
  const [step, setStep] = useState("question"); // "question" | "options"
  const [questionId, setQuestionId] = useState(null);

  const [questionData, setQuestionData] = useState({
    question_text: "",
    question_type: "mcq",
    mark: "",
    project_file: null,
    exam_id: examId,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Option creation state
  const [currentOption, setCurrentOption] = useState({
    option_text: "",
    is_correct: "0",
  });
  const [optionCount, setOptionCount] = useState(0);

  const handleChange = (field, value) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setQuestionData((prev) => ({ ...prev, project_file: e.target.files[0] }));
  };

  // Step 1: Create Question
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("question_text", questionData.question_text);
      formData.append("question_type", questionData.question_type);
      formData.append("mark", questionData.mark);
      formData.append("exam_id", questionData.exam_id);

      if (questionData.question_type === "project" && questionData.project_file) {
        formData.append("project_file", questionData.project_file);
      }

      const res = await apiService.post("/api/create_question", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Question created:", res);
      if (res.code === 400) {
        alert(res.message);
       window.location.reload();
      }
    
      setQuestionId(res.id);

      if (questionData.question_type === "mcq") {
        setStep("options"); // move to options step
        setMessage("✅ Question created! Now add 4 options.");
      } else {
        setMessage("✅ Project Question created!");
        resetQuestionForm();
      }
    } catch (err) {
      console.error("Error creating question:", err);
      setMessage("❌ Failed to create question.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Create Options (one by one)
  const handleSubmitOption = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await apiService.post("/api/create_option", {
        option_text: currentOption.option_text,
        is_correct: currentOption.is_correct,
        question_id: questionId,
      });

      const newCount = optionCount + 1;
      setOptionCount(newCount);

      if (newCount < 4) {
        setMessage(`✅ Option ${newCount} created. Add option ${newCount + 1}.`);
        setCurrentOption({ option_text: "", is_correct: "0" });
      } else {
        setMessage("✅ 4 Options created successfully!");
        resetQuestionForm(); // reset for new question
      }
    } catch (err) {
      console.error("Error creating option:", err);
      setMessage("❌ Failed to create option.");
    } finally {
      setLoading(false);
    }
  };

  // Reset everything for next question
  const resetQuestionForm = () => {
    setStep("question");
    setQuestionId(null);
    setQuestionData({
      question_text: "",
      question_type: "mcq",
      mark: "",
      project_file: null,
      exam_id: examId,
    });
    setOptionCount(0);
    setCurrentOption({ option_text: "", is_correct: "0" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">
          {step === "question" ? "Create Question" : "Add Options"}
        </h1>

        {/* Step 1: Create Question */}
        {step === "question" && (
          <form onSubmit={handleSubmitQuestion} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Text
              </label>
              <textarea
                value={questionData.question_text}
                onChange={(e) => handleChange("question_text", e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="Enter the question"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Type
              </label>
              <select
                value={questionData.question_type}
                onChange={(e) => handleChange("question_type", e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="mcq">MCQ</option>
                <option value="project">Project</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mark
              </label>
              <input
                type="number"
                value={questionData.mark}
                onChange={(e) => handleChange("mark", e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg"
                placeholder="Enter mark"
                required
              />
            </div>

            {questionData.question_type === "project" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Project File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 w-full"
                  accept="image/*,application/pdf"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Creating Question..." : "Create Question"}
            </button>
          </form>
        )}

        {/* Step 2: Create Options (MCQ) */}
        {step === "options" && (
          <form onSubmit={handleSubmitOption} className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Option {optionCount + 1} of 4
            </h2>

            <div>
              <input
                type="text"
                value={currentOption.option_text}
                onChange={(e) =>
                  setCurrentOption((prev) => ({
                    ...prev,
                    option_text: e.target.value,
                  }))
                }
                placeholder="Enter option text"
                className="w-full mt-1 p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Is Correct?
              </label>
              <select
                value={currentOption.is_correct}
                onChange={(e) =>
                  setCurrentOption((prev) => ({
                    ...prev,
                    is_correct: e.target.value,
                  }))
                }
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="0">Incorrect</option>
                <option value="1">Correct</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading
                ? "Saving Option..."
                : `Save Option ${optionCount + 1}`}
            </button>
          </form>
        )}

        {message && (
          <div className="text-center mt-6 text-sm font-medium">{message}</div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestionPage;
