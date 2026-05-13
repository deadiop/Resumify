const fields = {
  fullName: document.querySelector("#fullName"),
  role: document.querySelector("#role"),
  email: document.querySelector("#email"),
  phone: document.querySelector("#phone"),
  location: document.querySelector("#location"),
  website: document.querySelector("#website"),
  summary: document.querySelector("#summary"),
  experience: document.querySelector("#experience"),
  education: document.querySelector("#education"),
  skills: document.querySelector("#skills"),
};

const preview = {
  name: document.querySelector("#previewName"),
  role: document.querySelector("#previewRole"),
  email: document.querySelector("#previewEmail"),
  phone: document.querySelector("#previewPhone"),
  location: document.querySelector("#previewLocation"),
  website: document.querySelector("#previewWebsite"),
  summary: document.querySelector("#previewSummary"),
  experience: document.querySelector("#previewExperience"),
  education: document.querySelector("#previewEducation"),
  skills: document.querySelector("#previewSkills"),
  initials: document.querySelector("#avatarInitials"),
  photo: document.querySelector("#previewPhoto"),
  page: document.querySelector("#resumePreview"),
  avatar: document.querySelector(".avatar-frame"),
};

const fallback = {
  fullName: "Your Name",
  role: "Target Role",
  email: "email@example.com",
  phone: "+1 555 0000",
  location: "City, Country",
  website: "portfolio.com",
  summary: "Write a focused summary that highlights your impact, strengths, and the role you want next.",
};

function cleanValue(fieldName) {
  return fields[fieldName].value.trim() || fallback[fieldName] || "";
}

function setText(element, value) {
  element.textContent = value;
}

function renderMultiline(element, value) {
  element.replaceChildren();
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    const empty = document.createElement("p");
    empty.textContent = "Add details here.";
    element.append(empty);
    return;
  }

  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    element.append(paragraph);
  });
}

function renderSkills() {
  preview.skills.replaceChildren();
  const skills = cleanValue("skills")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  skills.forEach((skill) => {
    const tag = document.createElement("span");
    tag.textContent = skill;
    preview.skills.append(tag);
  });
}

function getInitials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "YN";
}

function updatePreview() {
  const fullName = cleanValue("fullName");
  setText(preview.name, fullName);
  setText(preview.role, cleanValue("role"));
  setText(preview.email, cleanValue("email"));
  setText(preview.phone, cleanValue("phone"));
  setText(preview.location, cleanValue("location"));
  setText(preview.website, cleanValue("website"));
  setText(preview.summary, cleanValue("summary"));
  setText(preview.initials, getInitials(fullName));
  renderMultiline(preview.experience, cleanValue("experience"));
  renderMultiline(preview.education, cleanValue("education"));
  renderSkills();
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updatePreview);
});

document.querySelector("#profileImage").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    preview.photo.src = reader.result;
    preview.avatar.classList.add("has-image");
  });
  reader.readAsDataURL(file);
});

document.querySelectorAll(".template-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".template-option").forEach((option) => option.classList.remove("active"));
    button.classList.add("active");
    preview.page.className = `resume-page template-${button.dataset.template}`;
  });
});

document.querySelectorAll("#printResume, #printResumeAlt").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

updatePreview();
