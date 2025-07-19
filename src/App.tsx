import React, { useState } from 'react';
import { FileText, CreditCard, Mail, Users, School } from 'lucide-react';
import StaffIDCard from './components/StaffIDCard';
import WelcomeMail from './components/WelcomeMail';
import StudentIDCard from './components/StudentIDCard';

type ActiveTab = 'staff-id' | 'welcome-mail' | 'student-id';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('staff-id');

  const tabs = [
    { id: 'staff-id' as ActiveTab, name: 'Staff ID Cards', icon: CreditCard },
    { id: 'welcome-mail' as ActiveTab, name: 'Welcome Mails', icon: Mail },
    { id: 'student-id' as ActiveTab, name: 'Student ID Cards', icon: School },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'staff-id':
        return <StaffIDCard />;
      case 'welcome-mail':
        return <WelcomeMail />;
      case 'student-id':
        return <StudentIDCard />;
      default:
        return <StaffIDCard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">PDF Generator Suite</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate professional ID cards and welcome mails</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;