import React, { useState } from "react";
import {
  FiBookOpen,
  FiUser,
  FiCheckSquare,
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
} from "react-icons/fi";

const SUPPORT_OPTIONS = [
  "Smart Classroom",
  "Digital Learning",
  "Teacher Training",
  "STEM Lab",
  "Scholarships",
  "Infrastructure",
  "Internet Connectivity",
];

const initialForm = {
  institutionName: "",
  institutionType: "",
  boardAffiliation: "",
  website: "",
  establishedYear: "",
  state: "",
  city: "",
  totalStudents: "",
  totalTeachers: "",
  locationType: "Urban",
  managementType: "Private",
  principalName: "",
  designation: "",
  email: "",
  phone: "",
  selectedSupport: [],
  aboutSchool: "",
};

const SchoolFormSection = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));

    // Clear a field's error once its current value is valid.
    const field = e.target;
    if (field.validity.valid) {
      setErrors((curr) => {
        if (!curr[name]) return curr;
        const next = { ...curr };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (item) => {
    setForm((curr) => {
      const exists = curr.selectedSupport.includes(item);
      const updated = exists
        ? curr.selectedSupport.filter((i) => i !== item)
        : [...curr.selectedSupport, item];
      return { ...curr, selectedSupport: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = Array.from(
      formRef.current.querySelectorAll("input, select, textarea"),
    );
    const invalidFields = fields.filter((field) => !field.validity.valid);

    if (invalidFields.length > 0) {
      const nextErrors = Object.fromEntries(
        invalidFields.map((field) => [
          field.name,
          field.validity.valueMissing
            ? "This field is required."
            : field.type === "email"
              ? "Please enter a valid email address."
              : field.type === "url"
                ? "Please enter a valid website URL."
                : "Please check this field.",
        ]),
      );
      setErrors(nextErrors);

      const firstInvalidField = invalidFields[0];
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => firstInvalidField.focus(), 300);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-[#06B6D4]">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#071B4A] mb-2">
          Application Submitted!
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
          Thank you for applying to join the StepUp Education Network. Our Team
          will verify details and contact your school.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm(initialForm);
          }}
          className="px-5 py-2.5 rounded-full bg-[#06B6D4] text-white text-xs font-semibold shadow hover:bg-cyan-600 transition"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="space-y-5 font-poppins text-[#071B4A]"
    >
      {/* 1. INSTITUTION DETAILS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiBookOpen className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">
            Institution Details
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="institutionName"
              aria-invalid={Boolean(errors.institutionName)}
              aria-describedby={
                errors.institutionName ? "institutionName-error" : undefined
              }
              value={form.institutionName}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.institutionName ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
              placeholder="e.g. St. Xavier School"
              required
            />
            {errors.institutionName && (
              <p
                id="institutionName-error"
                className="mt-1 text-xs text-red-600"
              >
                {errors.institutionName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Institution Type <span className="text-red-500">*</span>
            </label>
            <select
              name="institutionType"
              aria-invalid={Boolean(errors.institutionType)}
              aria-describedby={
                errors.institutionType ? "institutionType-error" : undefined
              }
              value={form.institutionType}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.institutionType ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
              required
            >
              <option value="">Select type</option>
              <option value="Primary">Primary School (K-5)</option>
              <option value="Secondary">Secondary (6-10)</option>
              <option value="HigherSecondary">Higher Secondary (11-12)</option>
              <option value="College">College / University</option>
            </select>
            {errors.institutionType && (
              <p
                id="institutionType-error"
                className="mt-1 text-xs text-red-600"
              >
                {errors.institutionType}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Board / Affiliation
            </label>
            <select
              name="boardAffiliation"
              value={form.boardAffiliation}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            >
              <option value="">Select board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="StateBoard">State Board</option>
              <option value="IB">IB / International</option>
              <option value="UGC">UGC / AICTE</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              aria-invalid={Boolean(errors.website)}
              aria-describedby={errors.website ? "website-error" : undefined}
              value={form.website}
              onChange={handleChange}
              placeholder="https://yourschool.edu"
              className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.website ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
            />
            {errors.website && (
              <p id="website-error" className="mt-1 text-xs text-red-600">
                {errors.website}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              State & City
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Hyderabad, Telangana"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>
        </div>
      </div>

      {/* 2. STATISTICS & CONTACT PERSON */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Statistics */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
            <FiCheckSquare className="text-sm text-[#06B6D4]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">
              Statistics & Management
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Total Students
              </label>
              <select
                name="totalStudents"
                value={form.totalStudents}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="">Select range</option>
                <option value="Under500">Under 500</option>
                <option value="500-1000">500 - 1,000</option>
                <option value="1000-2500">1,000 - 2,500</option>
                <option value="2500+">2,500+</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Total Teachers
              </label>
              <input
                type="number"
                name="totalTeachers"
                value={form.totalTeachers}
                onChange={handleChange}
                placeholder="e.g. 45"
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Location
              </label>
              <select
                name="locationType"
                value={form.locationType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
                <option value="Semi-Urban">Semi-Urban</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Management
              </label>
              <select
                name="managementType"
                value={form.managementType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Aided">Aided</option>
                <option value="NGO">NGO Run</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
            <FiUser className="text-sm text-[#06B6D4]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">
              Contact Person
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Principal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="principalName"
                aria-invalid={Boolean(errors.principalName)}
                aria-describedby={
                  errors.principalName ? "principalName-error" : undefined
                }
                value={form.principalName}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.principalName ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
                placeholder="Full name"
                required
              />
              {errors.principalName && (
                <p
                  id="principalName-error"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.principalName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                aria-invalid={Boolean(errors.designation)}
                aria-describedby={
                  errors.designation ? "designation-error" : undefined
                }
                value={form.designation}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.designation ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
                placeholder="e.g. Principal"
                required
              />
              {errors.designation && (
                <p id="designation-error" className="mt-1 text-xs text-red-600">
                  {errors.designation}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Official Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.email ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
                placeholder="principal@school.edu"
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                value={form.phone}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10 ${errors.phone ? "border-red-500 ring-2 ring-red-100" : "border-gray-200"}`}
                placeholder="+91 98765 43210"
                required
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUPPORT REQUIRED (COMPACT INLINE CHECKBOX PILLS) */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-gray-200">
          <FiCheckSquare className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">
            Support Required
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {SUPPORT_OPTIONS.map((item) => {
            const isChecked = form.selectedSupport.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => handleCheckboxToggle(item)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium transition ${
                  isChecked
                    ? "border-[#06B6D4] bg-cyan-50 text-[#06B6D4] font-semibold"
                    : "border-gray-200 bg-slate-50 text-gray-700 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    isChecked
                      ? "border-[#06B6D4] bg-[#06B6D4] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                ></div>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ABOUT SCHOOL & UPLOADS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiFileText className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">
            About School & Uploads
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              About Your School & Needs
            </label>
            <textarea
              name="aboutSchool"
              rows={2}
              value={form.aboutSchool}
              onChange={handleChange}
              placeholder="Tell us more about your school's needs, student background, and key goals..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#06B6D4] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">
                School Brochure
              </span>
              <input
                type="file"
                accept=".pdf"
                className="text-[10px] text-gray-500"
              />
            </div>
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#06B6D4] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">
                Recognition Certificate
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                className="text-[10px] text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#0284C7] to-[#10B981] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          <span>Apply as an Institution .</span>
        </button>
      </div>
    </form>
  );
};

export default SchoolFormSection;
