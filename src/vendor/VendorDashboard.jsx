import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { submitVendorRegistration } from "../services/vendorService";
import "./VendorDashboard.css";

export default function VendorDashboard() {
  const [vendorState, setVendorState] = useState("register"); // register | pending | approved
  const [vendor, setVendor] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [craftPhotos, setCraftPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    businessType: "artisan", // artisan | homestay | guide | transport
    email: "",
    phone: "",
    idProofType: "aadhar", // aadhar | pancard | drivinglicense
    idProofFile: null,
    address: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setFormData((prev) => ({ ...prev, idProofFile: e.target.files[0] }));
  }

  async function handleSubmitRegistration(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      // idProofFile is a File object — not stored in Firestore directly here
      // (that needs Firebase Storage, see idProofFile note below). We store
      // just the filename as a placeholder reference for now.
      const { idProofFile, ...vendorFields } = formData;
      const firestoreId = await submitVendorRegistration({
        ...vendorFields,
        idProofFileName: idProofFile?.name || null,
      });
      setVendor({
        ...formData,
        firestoreId,
        vendorId: `VND-${firestoreId.slice(0, 9).toUpperCase()}`,
        registeredAt: new Date().toLocaleDateString(),
      });
      setVendorState("pending");
    } catch (err) {
      console.error("Vendor registration failed:", err);
      setSubmitError("Something went wrong submitting your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCraftPhotoUpload(e) {
    const files = Array.from(e.target.files);
    setCraftPhotos((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    ]);
  }

  function removeCraftPhoto(id) {
    setCraftPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  // Register view
  if (vendorState === "register") {
    return (
      <div className="vendor-dashboard">
        <div className="vendor-header">
          <span className="eyebrow">Vendor Registration</span>
          <h2>Join as a Local Vendor</h2>
          <p>Register your business to reach tourists directly</p>
        </div>

        <form className="vendor-form sohrai-border" onSubmit={handleSubmitRegistration}>
          <div className="form-group">
            <label>Business Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your business name"
            />
          </div>

          <div className="form-group">
            <label>Business Type *</label>
            <select name="businessType" value={formData.businessType} onChange={handleInputChange}>
              <option value="artisan">Artisan / Craftsperson</option>
              <option value="homestay">Homestay / Accommodation</option>
              <option value="guide">Tour Guide</option>
              <option value="transport">Transport / Bus Service</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Your business location"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>ID Proof Type *</label>
            <select name="idProofType" value={formData.idProofType} onChange={handleInputChange}>
              <option value="aadhar">Aadhar Card</option>
              <option value="pancard">PAN Card</option>
              <option value="drivinglicense">Driving License</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload ID Proof *</label>
            <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
            {formData.idProofFile && <p className="file-name">✓ {formData.idProofFile.name}</p>}
          </div>

          {submitError && <p className="form-error">{submitError}</p>}

          <button type="submit" className="btn-primary vendor-submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    );
  }

  // Pending approval view (only if not yet approved)
  if (vendorState === "pending" && !isApproved) {
    return (
      <div className="vendor-dashboard">
        <div className="vendor-pending sohrai-border">
          <div className="pending-icon">⏳</div>
          <h2>Registration Under Review</h2>
          <p className="vendor-id">Vendor ID: <strong>{vendor.vendorId}</strong></p>
          <p>Your ID proof has been submitted for verification.</p>
          <p className="pending-note">Admin will review and approve within 24 hours.</p>

          <div className="pending-details">
            <div>
              <span className="eyebrow">Business Name</span>
              <p>{vendor.name}</p>
            </div>
            <div>
              <span className="eyebrow">Type</span>
              <p className="capitalize">{vendor.businessType}</p>
            </div>
            <div>
              <span className="eyebrow">Submitted</span>
              <p>{vendor.registeredAt}</p>
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setIsApproved(true)}
            style={{ marginTop: "1rem" }}
          >
            Simulate Admin Approval (for demo)
          </button>
        </div>
      </div>
    );
  }

  // Approved view with QR + craft uploads
  if (isApproved) {
    return (
      <div className="vendor-dashboard">
        <div className="vendor-approved">
          <div className="approved-header">
            <div className="approved-check">✓</div>
            <h2>Approved & Live</h2>
            <p className="vendor-id">Vendor ID: {vendor.vendorId}</p>
          </div>

          <div className="vendor-content">
            {/* QR Code Section */}
            <div className="qr-section sohrai-border">
              <span className="eyebrow">Your QR Code</span>
              <p>Share this with customers for direct booking</p>
              <div className="qr-container">
                <QRCodeSVG value={vendor.vendorId} size={180} level="H" includeMargin={true} />
              </div>
              <button className="btn-secondary" onClick={() => alert("QR Code download placeholder")}>
                Download QR Code
              </button>
            </div>

            {/* Craft Photos - only for artisans */}
            {vendor.businessType === "artisan" && (
              <div className="craft-section sohrai-border">
                <span className="eyebrow">Your Craft Photos</span>
                <p>Upload photos of your work to showcase on the marketplace</p>

                <div className="photo-upload">
                  <label className="upload-label">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleCraftPhotoUpload}
                      style={{ display: "none" }}
                    />
                    <span className="upload-btn">+ Add Photos</span>
                  </label>
                </div>

                {craftPhotos.length > 0 && (
                  <div className="photo-grid">
                    {craftPhotos.map((photo) => (
                      <div key={photo.id} className="photo-card">
                        <img src={photo.url} alt={photo.name} />
                        <button
                          className="photo-remove"
                          onClick={() => removeCraftPhoto(photo.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Business Info */}
            <div className="business-info sohrai-border">
              <span className="eyebrow">Business Information</span>
              <div className="info-grid">
                <div>
                  <strong>Name</strong>
                  <p>{vendor.name}</p>
                </div>
                <div>
                  <strong>Type</strong>
                  <p className="capitalize">{vendor.businessType}</p>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>{vendor.email}</p>
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>{vendor.phone}</p>
                </div>
              </div>
              {vendor.address && (
                <div style={{ marginTop: "1rem" }}>
                  <strong>Address</strong>
                  <p>{vendor.address}</p>
                </div>
              )}
            </div>

            <button
              className="btn-secondary"
              onClick={() => {
                setVendorState("register");
                setVendor(null);
                setIsApproved(false);
                setFormData({
                  name: "",
                  businessType: "artisan",
                  email: "",
                  phone: "",
                  idProofType: "aadhar",
                  idProofFile: null,
                  address: "",
                });
              }}
              style={{ marginTop: "1.5rem", width: "100%" }}
            >
              Register Another Business
            </button>
          </div>
        </div>
      </div>
    );
  }
}
