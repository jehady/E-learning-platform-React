
import React from "react";

const SkeletonBox = ({ width = "100%", height = "16px" }) => (
  <div
    style={{
      background: "#eee",
      borderRadius: "4px",
      width,
      height,
      margin: "6px 0",
      animation: "pulse 1.5s infinite",
    }}
  />
);

const CourseDiscussionSkeleton = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* Header skeleton */}
      <SkeletonBox width="60%" height="28px" />
      <SkeletonBox width="30%" height="18px" />

      {/* Video skeleton */}
      <div style={{ marginTop: 20 }}>
        <SkeletonBox width="100%" height="200px" />
      </div>

      {/* Sessions skeleton */}
      <div style={{ marginTop: 20 }}>
        <SkeletonBox width="40%" height="20px" />
        <SkeletonBox width="90%" height="14px" />
        <SkeletonBox width="85%" height="14px" />
        <SkeletonBox width="80%" height="14px" />
      </div>

      {/* Tabs skeleton */}
      <div style={{ marginTop: 20 }}>
        <SkeletonBox width="70%" height="20px" />
        <SkeletonBox width="90%" height="16px" />
        <SkeletonBox width="85%" height="16px" />
      </div>
    </div>
  );
};

export default CourseDiscussionSkeleton;
