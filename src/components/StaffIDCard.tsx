import React, { useState } from 'react';
import { Download, User, Calendar, Hash, MapPin, QrCode } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface StaffData {
  empId: string;
  dept: string;
  phone: string;
  address: string;
  bloodGroup: string;
  photo: string;
}

const StaffIDCard: React.FC = () => {
  const [staffData, setStaffData] = useState<StaffData>({
    empId: '',
    dept: '',
    phone: '',
    address: '',
    bloodGroup: '',
    photo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStaffData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStaffData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const generatePDF = async () => {
  //   const frontElement = document.getElementById('staff-id-card-front');
  //   const backElement = document.getElementById('staff-id-card-back');
  //   if (!frontElement || !backElement) return;

  //   const pdf = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: [53.98, 85.6]
  //   });

  //   // Generate front side
  //   const frontCanvas = await html2canvas(frontElement, {
  //     scale: 3,
  //     backgroundColor: '#ffffff',
  //     useCORS: true
  //   });
  //   const frontImgData = frontCanvas.toDataURL('image/png');
  //   pdf.addImage(frontImgData, 'PNG', 0, 0, 53.98, 85.6);

  //   // Add new page for back side
  //   pdf.addPage();
  //   const backCanvas = await html2canvas(backElement, {
  //     scale: 3,
  //     backgroundColor: '#ffffff',
  //     useCORS: true
  //   });
  //   const backImgData = backCanvas.toDataURL('image/png');
  //   pdf.addImage(backImgData, 'PNG', 0, 0, 53.98, 85.6);

  //   pdf.save(`${staffData.name || 'Staff'}_ID_Card.pdf`);
  // };

  const generatePDF = async () => {
  const frontElement = document.getElementById('staff-id-card-front');
  const backElement = document.getElementById('staff-id-card-back');
  if (!frontElement || !backElement) return;

  // Card size
  const cardWidth = 53.98;
  const cardHeight = 85.6;
  const gapBetweenCards = 10;

  // Use A4 in landscape to reduce zoom and fit both cards
  const pageWidth = 297;  // A4 width in mm
  const pageHeight = 210; // A4 height in mm (landscape)

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [pageHeight, pageWidth],
  });

  // Capture front side
  const frontCanvas = await html2canvas(frontElement, {
    scale: 3,
    backgroundColor: '#ffffff',
    useCORS: true,
    scrollY: -window.scrollY,
  });
  const frontImgData = frontCanvas.toDataURL('image/png');

  // Capture back side
  const backCanvas = await html2canvas(backElement, {
    scale: 3,
    backgroundColor: '#ffffff',
    useCORS: true,
    scrollY: -window.scrollY,
  });
  const backImgData = backCanvas.toDataURL('image/png');

  // Total combined width of both cards + gap
  const totalWidth = cardWidth * 2 + gapBetweenCards;

  // Center both cards
  const xStart = (pageWidth - totalWidth) / 2;
  const yStart = (pageHeight - cardHeight) / 2;

  // Add both images side-by-side
  pdf.addImage(frontImgData, 'PNG', xStart, yStart, cardWidth, cardHeight);
  pdf.addImage(backImgData, 'PNG', xStart + cardWidth + gapBetweenCards, yStart, cardWidth, cardHeight);

  pdf.save(`${staffData.empId || 'Staff'}_ID_Card.pdf`);
};

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Staff Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emp ID</label>
                <input
                  type="text"
                  name="empId"
                  value={staffData.empId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter employee ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dept</label>
                <input
                  type="text"
                  name="dept"
                  value={staffData.dept}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter department"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={staffData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={staffData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={staffData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blood group (e.g., A+, B-, O+)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">Front Side</h3>
              <div 
                id="staff-id-card-front"
                className="w-64 h-96 bg-white rounded-lg shadow-xl overflow-hidden relative border border-gray-200"
                style={{
                  backgroundImage: 'url("/src/assets/ID CARDS GU STAFF.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Photo positioned over background */}
                <div className="absolute top-[120px] left-[2000px] w-20 h-24 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                  {staffData.photo ? (
                    <img
                      src={staffData.photo}
                      alt="Staff"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {/* Name positioned over background */}
                
                {/* Details positioned over background */}
                <div className="absolute top-[240px] left-[20px] right-[20px] space-y-1 text-xs bg-[#233972] text-white">
                  <div className="flex">
                    <span className="w-20 drop-shadow-lg">Emp ID</span>
                    <span className="mr-2 drop-shadow-lg">:</span>
                    <span className="drop-shadow-lg">{staffData.empId || ''}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 drop-shadow-lg">Dept.</span>
                    <span className="mr-2 drop-shadow-lg">:</span>
                    <span className="drop-shadow-lg">{staffData.dept || ''}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 drop-shadow-lg">Phone No.</span>
                    <span className="mr-2 drop-shadow-lg">:</span>
                    <span className="drop-shadow-lg">{staffData.phone || ''}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 drop-shadow-lg">Address</span>
                    <span className="mr-2 drop-shadow-lg">:</span>
                    <span className="text-xs drop-shadow-lg">{staffData.address || ''}</span>
                  </div>
                  <div className="flex">
                    <span className="w-20 drop-shadow-lg">Blood Group</span>
                    <span className="mr-2 drop-shadow-lg">:</span>
                    <span className="drop-shadow-lg">{staffData.bloodGroup || ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Back Side</h3>
              <div 
                id="staff-id-card-back"
                className="w-64 h-96 bg-white rounded-lg shadow-xl overflow-hidden relative border border-gray-200"
              >
                {/* Orange Header */}
                <div className="bg-orange-500 h-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                  <div className="relative z-10 px-4 py-3 text-white text-center">
                    <h2 className="text-base font-bold">TERMS AND CONDITIONS</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">This ID card is the property of Geeta University and must be returned upon termination of employment.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Loss of this card should be reported immediately to the HR department.</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-700">Website</span>
                      <span className="text-gray-900">www.geetauniversity.edu.in</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-4">
                    {/* <div className="w-16 h-16 border border-gray-300 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-gray-400" />
                    </div> */}
                    {/* <div className="text-right">
                      <div className="text-sm text-orange-600 font-semibold">
                        <div>Joined Date: {staffData.joiningDate || 'DD/MM/YEAR'}</div>
                        <div>Expire Date: {staffData.expiryDate || 'DD/MM/YEAR'}</div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Footer */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-700">LOGO HERE</div>
                  <div className="text-sm font-semibold text-gray-700">Principal</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffIDCard;