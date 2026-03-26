import React, { useState } from 'react';

// Import the new components
// import IdentitySection from './IdentitySection';
import PropertyBasicsSection from './PropertyBasicsSection';
import LocationSection from './LocationSection';
import PricingSection from './PricingSection';
import MediaSection from './MediaSection';
import AmenitiesSection from './AmenitiesSection';
import ReviewSection from './ReviewSection';
import OtpModal from './OtpModal';

const HostVerification = () => {
  // Form data state

  
  // Form state
  // const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [customRuleInput, setCustomRuleInput] = useState('');
  
  // Terms and conditions
  const displayedTerms = [
    "You must be the legal owner or have authorization to list the property",
    "All information provided must be accurate and truthful",
    "You are responsible for maintaining the property in good condition",
    "Guests must be treated with respect and courtesy",
    "You must comply with all local laws and regulations",
    "Platform fees will be deducted from your earnings",
    "Cancellation policy must be clearly communicated to guests",
    "You are responsible for any damages caused by your negligence",
    "Personal data of guests must be protected and not shared without consent",
    "Any disputes will be resolved according to the platform's resolution policy"
  ];
  
  // OTP functions
  const handleSendOtp = () => {
    if (formData.email) {
      setShowOtpModal(true);
    }
  };
  
  const handleVerifyOtp = (otp) => {
    setIsEmailVerified(true);
    setShowOtpModal(false);
  };
  
  // File handling
  const handleFileChange = (e, fieldName, isMultiple = false) => {
    const files = e.target.files;
    
    // Check file sizes
    const oversized = Array.from(files).filter(f => f.size > 10 * 1024 * 1024);
    if (oversized.length > 0) {
      alert("Please upload files smaller than 10MB.");
      e.target.value = "";
      return;
    }

    if (isMultiple && fieldName === 'images') {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    } else if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: files[0]
      }));
    }
  };
  
  // Array item removal
  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };
  
  // Toggle amenity
  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };
  
  // Add custom amenity
  const addCustomAmenity = () => {
    if (customAmenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        customAmenities: [...prev.customAmenities, customAmenityInput.trim()]
      }));
      setCustomAmenityInput('');
    }
  };
  
  // Add rule
  const addRule = () => {
    if (customRuleInput.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, customRuleInput.trim()]
      }));
      setCustomRuleInput('');
    }
  };
  
  // Submit form
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Property listed successfully!');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00152d] via-[#002855] to-[#00152d] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent from-accent to-purple-400 mb-4">
            Become a Host
          </h1>
          <p className="text-gray-400 text-lg">Complete your property listing in one go</p>
        </div>

        <form className="space-y-12">
          {/* <IdentitySection
            formData={formData}
            setFormData={setFormData}
            isEmailVerified={isEmailVerified}
            setShowOtpModal={setShowOtpModal}
            handleSendOtp={handleSendOtp}
            handleFileChange={handleFileChange}
          /> */}

          <PropertyBasicsSection
            formData={formData}
            setFormData={setFormData}
          />

          <LocationSection
            formData={formData}
            setFormData={setFormData}
          />

          <PricingSection
            formData={formData}
            setFormData={setFormData}
          />

          <MediaSection
            formData={formData}
            setFormData={setFormData}
            handleFileChange={handleFileChange}
            removeArrayItem={removeArrayItem}
          />

          <AmenitiesSection
            formData={formData}
            setFormData={setFormData}
            toggleAmenity={toggleAmenity}
            addCustomAmenity={addCustomAmenity}
            customAmenityInput={customAmenityInput}
            setCustomAmenityInput={setCustomAmenityInput}
            addRule={addRule}
            customRuleInput={customRuleInput}
            setCustomRuleInput={setCustomRuleInput}
            removeArrayItem={removeArrayItem}
          />

          <ReviewSection
            formData={formData}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            displayedTerms={displayedTerms}
          />
        </form>
      </div>

      {/* OTP Modal */}
      <OtpModal
        showOtpModal={showOtpModal}
        setShowOtpModal={setShowOtpModal}
        handleVerifyOtp={handleVerifyOtp}
      />
    </div>
  );
};

export default HostVerification;