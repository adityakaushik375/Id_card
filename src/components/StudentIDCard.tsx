import React, { useState } from "react";
import {
  Download,
  User,
  Calendar,
  Hash,
  GraduationCap,
  QrCode,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface StudentData {
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  session: string;
  address: string;
  emergencyContact: string;
  photo: string;
  school: string;
}

const StudentIDCard: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData>({
    name: "",
    rollNumber: "",
    class: "",
    section: "",
    session: "",
    address: "",
    emergencyContact: "",
    photo: "",
    school: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStudentData((prev) => ({
          ...prev,
          photo: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const generatePDF = async () => {
  //   const frontElement = document.getElementById("student-id-card-front");
  //   const backElement = document.getElementById("student-id-card-back");
  //   if (!frontElement || !backElement) return;

  //   // Size in mm: ID card = 53.98mm x 85.6mm → Total width = 2 * 53.98
  //   const pdf = new jsPDF({
  //     orientation: "landscape", // landscape to fit both cards side-by-side
  //     unit: "mm",
  //     format: [85.6, 107.96], // height x (front + back width)
  //   });

  //   // Convert front and back to canvases
  //   const frontCanvas = await html2canvas(frontElement, {
  //     scale: 3,
  //     backgroundColor: "#ffffff",
  //     useCORS: true,
  //   });

  //   const backCanvas = await html2canvas(backElement, {
  //     scale: 3,
  //     backgroundColor: "#ffffff",
  //     useCORS: true,
  //   });

  //   const frontImgData = frontCanvas.toDataURL("image/png");
  //   const backImgData = backCanvas.toDataURL("image/png");

  //   // Add both images to the same page
  //   pdf.addImage(frontImgData, "PNG", 0, 0, 53.98, 85.6); // left side
  //   pdf.addImage(backImgData, "PNG", 53.98, 0, 53.98, 85.6); // right side

  //   pdf.save(`${studentData.name || "Student"}_ID_Card.pdf`);
  // };

  const generatePDF = async () => {
    const frontElement = document.getElementById("student-id-card-front");
    const backElement = document.getElementById("student-id-card-back");
    if (!frontElement || !backElement) return;

    // ID card size
    const cardWidth = 53.98;
    const cardHeight = 85.6;
    const gapBetweenCards = 10; // mm

    // A4 page size in landscape
    const pageWidth = 297;
    const pageHeight = 210;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [pageHeight, pageWidth],
    });

    const frontCanvas = await html2canvas(frontElement, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const backCanvas = await html2canvas(backElement, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const frontImgData = frontCanvas.toDataURL("image/png");
    const backImgData = backCanvas.toDataURL("image/png");

    const totalCardWidth = cardWidth * 2 + gapBetweenCards;

    // Calculate centered X and Y
    const xStart = (pageWidth - totalCardWidth) / 2;
    const yStart = (pageHeight - cardHeight) / 2;

    // Add front and back card images
    pdf.addImage(frontImgData, "PNG", xStart, yStart, cardWidth, cardHeight);
    pdf.addImage(
      backImgData,
      "PNG",
      xStart + cardWidth + gapBetweenCards,
      yStart,
      cardWidth,
      cardHeight
    );

    pdf.save(`${studentData.name || "Student"}_ID_Card.pdf`);
  };

  const getSchoolColors = (school: string) => {
    const colors = {
      Lakshay: {
        primary: "bg-green-500",
        gradient: "from-green-500 to-green-600",
      },
      GVM: { primary: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
      GVMPS: {
        primary: "bg-purple-500",
        gradient: "from-purple-500 to-purple-600",
      },
      DPS: { primary: "bg-red-500", gradient: "from-red-500 to-red-600" },
      "Gurugram School": {
        primary: "bg-yellow-500",
        gradient: "from-yellow-500 to-yellow-600",
      },
    };
    return (
      colors[school as keyof typeof colors] || {
        primary: "bg-orange-500",
        gradient: "from-orange-500 to-orange-600",
      }
    );
  };

  const schoolColors = getSchoolColors(studentData.school);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
              Student Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School
                </label>
                <select
                  name="school"
                  value={studentData.school}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select School</option>
                  <option value="Lakshay">Lakshay</option>
                  <option value="GVM">GVM</option>
                  <option value="GVMPS">GVMPS</option>
                  <option value="DPS">DPS</option>
                  <option value="Gurugram School">Gurugram School</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={studentData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter roll number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={studentData.class}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter class"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={studentData.section}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter section"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session
                </label>
                <input
                  type="text"
                  name="session"
                  value={studentData.session}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2024-25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={studentData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emergency contact"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={studentData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Front Side */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Front Side
              </h3>
              <div
                id="student-id-card-front"
                className="w-64 h-96 bg-white rounded-lg shadow-xl overflow-hidden relative border border-gray-200"
              >
                {/* Colored Header */}
                <div className={`${schoolColors.primary} h-20 relative`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${schoolColors.gradient}`}
                  ></div>
                  <div className="relative z-10 px-4 py-3 text-white text-center">
                    <h2 className="text-base font-bold">
                      {studentData.school || "SCHOOL NAME"}
                    </h2>
                    <p className="text-sm opacity-90">STUDENT ID CARD</p>
                  </div>
                  {/* Diagonal cut */}
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[256px] border-l-transparent border-b-[24px] border-b-white"></div>
                </div>

                {/* Content Area */}
                <div className="p-4 pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Photo */}
                    <div className="w-24 h-28 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                      {studentData.photo ? (
                        <img
                          src={studentData.photo}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="w-full text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Student Name
                        </span>
                        <span className="text-gray-900 text-right">
                          {studentData.name || "Name Here"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Session
                        </span>
                        <span className="text-gray-900">
                          {studentData.session || "2024-25"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Class
                        </span>
                        <span className="text-gray-900">
                          {studentData.class || "Class Here"} -{" "}
                          {studentData.section || "A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Emergency Call
                        </span>
                        <span className="text-gray-900">
                          {studentData.emergencyContact || "123-456-7890"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className={`absolute bottom-0 left-0 right-0 ${schoolColors.primary} px-4 py-1`}
                >
                  <div className="text-white text-xs text-center">
                    School address: Street, State, 1234
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Back Side
              </h3>
              <div
                id="student-id-card-back"
                className="w-64 h-96 bg-white rounded-lg shadow-xl overflow-hidden relative border border-gray-200"
              >
                {/* Colored Header */}
                <div className={`${schoolColors.primary} h-16 relative`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${schoolColors.gradient}`}
                  ></div>
                  <div className="relative z-10 px-4 py-3 text-white text-center">
                    <h2 className="text-base font-bold">
                      TERMS AND CONDITIONS
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      {/* <div
                        className={`w-2 h-2 ${schoolColors.primary} rounded-full mt-1.5 mr-2 flex-shrink-0`}
                      ></div> */}
                      <p className="text-sm text-gray-700">
                        <strong>・</strong> This ID card is the property of the
                        school and must be returned upon leaving the
                        institution.
                      </p>
                    </div>
                    <div className="flex items-start">
                      {/* <div
                        className={`w-2 h-2 ${schoolColors.primary} rounded-full mt-1.5 mr-2 flex-shrink-0`}
                      ></div> */}
                      <p className="text-sm text-gray-700">
                        <strong>・</strong>Loss of this card should be reported
                        immediately to the school administration.
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-700">Mail</span>
                      <span className="text-gray-900 text-right">
                        {studentData.name
                          ? `${studentData.name
                              .toLowerCase()
                              .replace(" ", ".")}@school.edu`
                          : "student@school.edu"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-700">
                        Website
                      </span>
                      <span className="text-gray-900">
                        www.{studentData.school?.toLowerCase() || "school"}
                        .edu.in
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-700">
                        Session:
                      </span>
                      <span className="text-gray-900">
                        {studentData.session || "2024-25"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2">
                    <div className="text-right">
                      <div
                        className={`text-xs font-semibold ${
                          studentData.school
                            ? "text-" +
                              getSchoolColors(studentData.school).primary.split(
                                "-"
                              )[1] +
                              "-600"
                            : "text-orange-600"
                        }`}
                      >
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
