
function authenticate() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "CHSS" && pass === "CHSS1974") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    loadMarksheet();
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function loadMarksheet() {
  const html = [
    '<div class="school-title">',
      '<img src="https://res.cloudinary.com/dwfheimtj/image/upload/v1749614028/SSSSSSSSSSSSSS_yrbkds.png" alt="School Logo" />',
      '<h2>CHANDMARI HIGHER SECONDARY SCHOOL</h2>',
    '</div>',
    '<form id="markForm">',
      '<label for="studentName">Name</label>',
      '<input type="text" id="studentName" placeholder="Student Name" required />',
      '<label for="studentClass">Class</label>',
      '<select id="studentClass" required>',
        '<option value="">Class</option>',
        '<option>1</option><option>2</option><option>3</option><option>4</option>',
        '<option>5</option><option>6</option><option>7</option>',
      '</select>',
      '<label for="studentSec">Section</label>',
      '<select id="studentSec" required>',
        '<option value="">Sec</option><option>A</option><option>B</option><option>C</option>',
      '</select>',
      '<label for="rollNo">RollNo</label>',
      '<select id="rollNo" required></select><br><br>',
      '<div id="subjectFields"></div>',
      '<label>Total Marks</label><br><input type="number" id="overallTotal" placeholder="Total Marks" readonly /><br>',
      '<label>Average Marks</label><br><input type="number" id="averageMarks" placeholder="Average Marks" readonly /><br>',
      '<div class="signature-row"><div>Class Teacher</div>',
      '<div class="signature-block">',
        '<img src="https://res.cloudinary.com/dwfheimtj/image/upload/v1750691317/SIGNATURE1_sxs2ss.jpg" class="signature" alt="Digital Signature" />',
        '<div class="principal-label">Principal</div>',
      '</div></div>',
      '<div class="button-row"><hr>',
        '<button type="button" onclick="downloadAsImage()">Download as JPG</button>',
        '<button type="button" onclick="window.print()">Print</button>',
        '<button type="reset">Reset Form</button>',
      '</div>',
    '</form>'
  ].join("");
  document.getElementById("mainContent").innerHTML = html;
  initSubjects();
  initRollNos();
}

function initSubjects() {
  const subjects = ["English", "Grammar", "Mathematics", "Science", "SocialScience", "Hindi", "MoralValues", "Heritage", "GK", "Art", "Spelling", "Computer"];
  const container = document.getElementById("subjectFields");
  container.innerHTML = "";
  subjects.forEach(subject => {
    container.innerHTML += `<label>${subject}</label>
      <input type="number" placeholder="EXT" min="0" max="100" oninput="calculateSubjectTotal(this)">
      <input type="number" placeholder="INT" min="0" max="100" oninput="calculateSubjectTotal(this)">
      <input type="number" placeholder="Total" readonly>
      <input type="text" placeholder="Grade" readonly>`;
    if (subject === "Computer") container.innerHTML += '<br/>';
  });
}

function calculateSubjectTotal(inputEl) {
  const inputs = Array.from(document.querySelectorAll('#subjectFields input'));
  for (let i = 0; i < inputs.length; i += 4) {
    const ext = parseInt(inputs[i].value);
    const int = parseInt(inputs[i + 1].value);
    if (isNaN(ext) && isNaN(int)) {
      inputs[i + 2].value = "";
      inputs[i + 3].value = "";
    } else {
      const total = (isNaN(ext) ? 0 : ext) + (isNaN(int) ? 0 : int);
      inputs[i + 2].value = total;
      inputs[i + 3].value = getGrade(total);
    }
  }
  calculateOverallTotalAndAverage();
}

function getGrade(score) {
  if (score >= 90) return "A**";
  if (score >= 80) return "A*";
  if (score >= 70) return "B1";
  if (score >= 60) return "B2";
  if (score >= 50) return "C1";
  if (score >= 40) return "C2";
  return "D";
}

function calculateOverallTotalAndAverage() {
  const allTotals = document.querySelectorAll('#subjectFields input[placeholder="Total"]');
  let sum = 0, count = 0;
  allTotals.forEach(input => {
    const val = parseInt(input.value);
    if (!isNaN(val)) { sum += val; count++; }
  });
  document.getElementById('overallTotal').value = sum;
  document.getElementById('averageMarks').value = count > 0 ? (sum / count).toFixed(2) : '';
}

function downloadAsImage() {
  const container = document.querySelector(".container");
  html2canvas(container, { useCORS: true, scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    const studentName = document.getElementById('studentName').value || 'marksheet';
    const studentClass = document.getElementById('studentClass').value || '';
    link.download = `${studentName}_Class${studentClass}.jpg`;
    link.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    link.click();
  });
}

function initRollNos() {
  const rollNoSelect = document.getElementById("rollNo");
  for (let i = 1; i <= 50; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    rollNoSelect.appendChild(option);
  }
}
