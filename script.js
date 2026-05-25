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
  profileImage: document.querySelector("#profileImage"),
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
  avatar: document.querySelector(".avatar-frame"),
  page: document.querySelector("#resumePreview"),
};

function setText(element, value) {
  element.textContent = value;
}

function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderMultiline(element, value) {
  element.innerHTML = "";

  value
    .split("\n")
    .filter(line => line.trim() !== "")
    .forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      element.appendChild(p);
    });
}

function renderSkills() {
  preview.skills.innerHTML = "";

  fields.skills.value
    .split(",")
    .map(skill => skill.trim())
    .filter(Boolean)
    .forEach(skill => {
      const tag = document.createElement("span");
      tag.textContent = skill;
      preview.skills.appendChild(tag);
    });
}

function updatePreview() {
  setText(preview.name, fields.fullName.value);
  setText(preview.role, fields.role.value);
  setText(preview.email, fields.email.value);
  setText(preview.phone, fields.phone.value);
  setText(preview.location, fields.location.value);
  setText(preview.website, fields.website.value);

  preview.initials.textContent = getInitials(fields.fullName.value);

  renderMultiline(preview.summary, fields.summary.value);
  renderMultiline(preview.experience, fields.experience.value);
  renderMultiline(preview.education, fields.education.value);

  renderSkills();
}

Object.values(fields).forEach(field => {
  if (field.type !== "file") {
    field.addEventListener("input", updatePreview);
  }
});

/* IMAGE UPLOAD */

fields.profileImage.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = e => {
    preview.photo.src = e.target.result;
    preview.photo.style.display = "block";
    preview.initials.style.display = "none";
  };

  reader.readAsDataURL(file);
});

/* TEMPLATE SWITCH */

const templateButtons = document.querySelectorAll(".template-option");

templateButtons.forEach(button => {
  button.addEventListener("click", () => {

    templateButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const template = button.dataset.template;

    preview.page.className = `resume-preview ${template}`;
  });
});

/* DOWNLOAD PDF */

document
  .querySelector("#printResume")
  .addEventListener("click", () => {
    window.print();
  });

updatePreview();
