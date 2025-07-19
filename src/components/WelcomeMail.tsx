import React, { useState } from "react";
import { Download, Mail, User, Calendar, Building2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface WelcomeData {
  employeeName: string;
  position: string;
  department: string;
  startDate: string;
  reportingManager: string;
  hrContact: string;
  email: string;
  workLocation: string;
}

const WelcomeMail: React.FC = () => {
  const [welcomeData, setWelcomeData] = useState<WelcomeData>({
    employeeName: "",
    position: "",
    department: "",
    startDate: "",
    reportingManager: "",
    hrContact: "",
    email: "",
    workLocation: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setWelcomeData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = async () => {
    const element = document.getElementById("welcome-mail");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 1.2, // lower zoom
      backgroundColor: "#ffffff",
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;

    // Calculate available space after margins
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    // Resize image to fit inside the margins
    const ratio = Math.min(
      availableWidth / canvas.width,
      availableHeight / canvas.height
    );
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    const xOffset = (pageWidth - imgWidth) / 2;
    const yOffset = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
    pdf.save(`Welcome_Letter_${welcomeData.employeeName || "Employee"}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              Welcome Mail Information
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={welcomeData.employeeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter employee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={welcomeData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter position"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={welcomeData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Administration">Administration</option>
                  <option value="Academic">Academic</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Library">Library</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={welcomeData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reporting Manager
                </label>
                <input
                  type="text"
                  name="reportingManager"
                  value={welcomeData.reportingManager}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reporting manager name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HR Contact
                </label>
                <input
                  type="text"
                  name="hrContact"
                  value={welcomeData.hrContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter HR contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={welcomeData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location
                </label>
                <input
                  type="text"
                  name="workLocation"
                  value={welcomeData.workLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter work location"
                />
              </div>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Generate PDF
          </button>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Welcome Letter Preview
            </h3>
            <div
              id="welcome-mail"
              className="bg-white p-8 min-h-[600px] shadow-lg border border-gray-200"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-blue-600 mb-2">
                  Geeta University
                </h1>
                <p className="text-gray-600">Human Resources Department</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Date: {new Date().toLocaleDateString()}
                </p>
                <p className="text-gray-800 font-semibold">
                  Dear {welcomeData.employeeName || "[Employee Name]"},
                </p>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We are delighted to welcome you to Geeta University! We are
                  excited to have you join our team as a{" "}
                  <strong>{welcomeData.position || "[Position]"}</strong> in the{" "}
                  <strong>{welcomeData.department || "[Department]"}</strong>{" "}
                  department.
                </p>

                <p>
                  Your first day of work will be on{" "}
                  <strong>{welcomeData.startDate || "[Start Date]"}</strong>.
                  Please report to the HR department at 9:00 AM for your
                  orientation and onboarding process.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Important Details:
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>
                      <strong>Reporting Manager:</strong>{" "}
                      {welcomeData.reportingManager || "[Manager Name]"}
                    </li>
                    <li>
                      <strong>Work Location:</strong>{" "}
                      {welcomeData.workLocation || "[Location]"}
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      {welcomeData.email || "[Email Address]"}
                    </li>
                    <li>
                      <strong>HR Contact:</strong>{" "}
                      {welcomeData.hrContact || "[HR Contact]"}
                    </li>
                  </ul>
                </div>

                <p>Please bring the following documents on your first day:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Original and photocopies of educational certificates</li>
                  <li>Previous employment letters (if applicable)</li>
                  <li>Identity proof (Aadhar/PAN/Passport)</li>
                  <li>Address proof</li>
                  <li>Recent passport-size photographs</li>
                </ul>

                <p>
                  We look forward to working with you and are confident that you
                  will be a valuable addition to our team.
                </p>

                <p className="mt-6">Welcome aboard!</p>

                <div className="mt-8 pt-4 border-t border-gray-200">
                  <p className="font-semibold">Best regards,</p>
                  <p className="text-blue-600 font-semibold">
                    Human Resources Department
                  </p>
                  <p className="text-sm text-gray-600">Geeta University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMail;
