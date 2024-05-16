import React from 'react';

const dummyFeedbackData = [
    {
        id: 1,
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        feedback: 'Great course, learned a lot!',
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        studentEmail: 'jane@example.com',
        feedback: 'The instructor was very knowledgeable and explained concepts well.',
      },
      {
        id: 3,
        studentName: 'Michael Johnson',
        studentEmail: 'michael@example.com',
        feedback: 'Excellent content, would recommend to others!',
      },
      {
        id: 4,
        studentName: 'Emily Brown',
        studentEmail: 'emily@example.com',
        feedback: 'Really enjoyed the interactive exercises.',
      },
      {
        id: 5,
        studentName: 'Chris Wilson',
        studentEmail: 'chris@example.com',
        feedback: 'The course was challenging but rewarding.',
      },
      {
        id: 6,
        studentName: 'Amanda Lee',
        studentEmail: 'amanda@example.com',
        feedback: 'The material was presented in a clear and concise manner.',
      },
      {
        id: 7,
        studentName: 'Daniel Martinez',
        studentEmail: 'daniel@example.com',
        feedback: 'I appreciated the real-world examples provided throughout the course.',
      },
      {
        id: 8,
        studentName: 'Sarah Thompson',
        studentEmail: 'sarah@example.com',
        feedback: 'Great instructor and engaging content.',
      },
      {
        id: 9,
        studentName: 'Kevin Davis',
        studentEmail: 'kevin@example.com',
        feedback: 'I would have liked more practice exercises to reinforce learning.',
      },
      {
        id: 10,
        studentName: 'Jessica Garcia',
        studentEmail: 'jessica@example.com',
        feedback: 'The course exceeded my expectations!',
      },
];

const ViewStudentFeedback = () => {
  return (
    <div className="container mx-auto">
      <p className="text-4xl font-bold text-blue-500 underline text-center mb-4"> Student Feedbacks</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyFeedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.studentEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentFeedback;
