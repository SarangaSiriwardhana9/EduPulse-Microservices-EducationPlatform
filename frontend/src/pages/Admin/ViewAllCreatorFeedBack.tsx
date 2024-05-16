import React from 'react';

const dummyCreatorFeedbackData = [
    {
        id: 1,
        creatorName: 'John Doe',
        creatorEmail: 'john@example.com',
        feedback: 'The platform is user-friendly and easy to navigate.',
      },
      {
        id: 2,
        creatorName: 'Jane Smith',
        creatorEmail: 'jane@example.com',
        feedback: 'Great platform for uploading courses!',
      },
      {
        id: 3,
        creatorName: 'Alice Johnson',
        creatorEmail: 'alice@example.com',
        feedback: 'I love the analytics dashboard provided for tracking course performance.',
      },
      {
        id: 4,
        creatorName: 'Bob Anderson',
        creatorEmail: 'bob@example.com',
        feedback: 'The support team is very responsive and helpful.',
      },
      {
        id: 5,
        creatorName: 'Emily Brown',
        creatorEmail: 'emily@example.com',
        feedback: 'The course creation process is intuitive and straightforward.',
      },
      {
        id: 6,
        creatorName: 'Michael Wilson',
        creatorEmail: 'michael@example.com',
        feedback: 'I appreciate the variety of resources available for course creation.',
      },
      {
        id: 7,
        creatorName: 'Sophia Lee',
        creatorEmail: 'sophia@example.com',
        feedback: 'The platform has exceeded my expectations in terms of functionality.',
      },
      {
        id: 8,
        creatorName: 'Oliver Taylor',
        creatorEmail: 'oliver@example.com',
        feedback: 'I am impressed by the community support and engagement.',
      },
      {
        id: 9,
        creatorName: 'Ella Martinez',
        creatorEmail: 'ella@example.com',
        feedback: 'The platform provides excellent monetization options for creators.',
      },
      {
        id: 10,
        creatorName: 'William Garcia',
        creatorEmail: 'william@example.com',
        feedback: 'I would love to see more customization options for course pages.',
      },
  // Add more dummy feedback data...
];

const ViewAllCreatorFeedback = () => {
  return (
    <div className="container mx-auto">
      <p className="text-4xl font-bold text-blue-500 underline text-center mb-4"> Creator Feedbacks</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyCreatorFeedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.creatorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.creatorEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllCreatorFeedback;
