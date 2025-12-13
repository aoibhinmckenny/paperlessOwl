// === Elements ===
console.log("✅ Script loaded");

const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
const loginContainer = document.getElementById('loginContainer');
const inboxPage = document.getElementById('inboxPage');
const emailList = document.getElementById('emailList');
const emailPreview = document.getElementById('emailPreview');
const logoutBtn = document.getElementById('logoutBtn');
const emailSound = document.getElementById('emailSound');

function playEmailSound() {
  emailSound.currentTime = 0;
  emailSound.play();
}


// === Fake credentials for testing ===
const USER = 'journalist';
const PASS = 'password123';

let currentUser = '';
let userEmail = '';

// === Fake email data ===
const emails = [
 {
   sender: 'm.turner@cityledger.com',
   subject: 'Follow-up on your festival piece',
   date: 'Oct 28, 2025',
   body: 'Hey, just checking in — any updates on the write-up about Lakeshore Fest? We’re hoping to slot it for next week’s culture section. Let me know if you need photos or additional sources.',
   read: true
 },
 {
   sender: 'press@aurorarecords.com',
   subject: 'Press Release: Lumen Arc Announces New Album',
   date: 'Oct 22, 2025',
   body: 'Aurora Records is excited to announce Lumen Arc’s upcoming album “Night Bloom,” releasing December 5. Advance listening links will be available next week.',
   read: true
 },
 {
   sender: 'r.caldwell@protonmail.com',
   subject: 'Still digging into that label dispute?',
   date: 'Oct 11, 2025',
   body: 'I might have someone willing to talk about the licensing issues at MirrorTone. Let me know if you’re still on the story.',
   read: true
 },
 {
   sender: 'newsletter@musicsceneweekly.com',
   subject: 'This Week in Music (Oct 6)',
   date: 'Oct 6, 2025',
   body: 'In this issue: indie label mergers, venue shutdowns, and emerging artists to watch.',
   read: true
 },
 {
   sender: 'jen.lopez@horizonpr.com',
   subject: 'Interview Opportunity: Aster Vale',
   date: 'Sep 28, 2025',
   body: 'Hi! Reaching out to see if you’d be interested in interviewing Aster Vale about her new single and tour. She’s available next Thursday or Friday.',
   read: true
 },
 {
	sender: 'editor@dailyobserver.org',
	subject: 'Follow-Up on Your Draft',
	date: 'Nov 14, 2025',
	body: 'Please revise paragraphs 5 for clarity before we move to layout.',
	read: true
 },
 {
    sender: 'c.henley@cityledger.com',
    subject: 'Next Month’s Features Meeting',
    date: 'Sep 15, 2025',
    body: 'Reminder: features pitch meeting is on Monday at 10 a.m. Bring anything you want to slot for November or December.',
    read: true
 },
 {
    sender: 'mason.wells@paramountmgmt.com',
    subject: 'Follow-up: Interview Window for Dorian Finch',
    date: 'Sep 9, 2025',
    body: 'Circling back — any chance you’re free for a quick remote interview with Dorian this week? He’s got 20 minutes open on Thursday.',
    read: true
 },
 {
    sender: 'readerfeedback22@mail.com',
    subject: 'Your last article',
    date: 'Sep 2, 2025',
    body: 'Hey, just wanted to say your piece on underground venue closures was really good. Didn’t know half that stuff was going on.',
    read: true
 },
 {
    sender: 'press@electrichourpr.com',
    subject: 'Press Alert: Nightshifter Announces EP + Tour',
    date: 'Aug 7, 2025',
    body: 'Nightshifter will release their new EP “Static Hearts” on October 3. Tour dates and EPK available upon request.',
    read: true
 },
];

// === Handle login ===
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) { //any non empty accepted
    currentUser = username;
    userEmail = 'reporter.' + currentUser.toLowerCase() + '@paperlessowl.com'; //create a fake email with the users name
    loginMsg.textContent = 'Login successful.';
    loginMsg.style.color = 'green';

    //Switch from login screen to inbox
    setTimeout(() => {
      loginContainer.classList.add('hidden');
      inboxPage.classList.remove('hidden');
      renderInbox();

      const inboxTitle = document.getElementById('inboxTitle');
      inboxTitle.textContent = inboxTitle.textContent + ' — ' + currentUser; //add the users name to the inbox title

      setTimeout(() => {
            playEmailSound();
            addNewEmail({
                sender: 'r_hartley@inboxmail.net',
                 subject: 'Look into this band?',
                 date: 'Nov 9, 2025',
                 body: 'Hey, I know you’re busy, but if you get a chance, check out this Reddit page. There’s something strange going on with this band. Their songs, interviews, even old gig posters have vanished from everywhere. There’s very little information about them anywhere, but they were one of the big up-and-coming bands in the ’90s. <a href="https://www.reddit.com/r/steelreverie/" target="_blank" rel="noopener noreferrer">r/steelreverie</a>.',
                 read: false
      });

      }, 2000); //delay before email arrives after logging in

    }, 600);

  } else {
    loginMsg.textContent = 'Invalid username or password.';
    loginMsg.style.color = 'red';
  }
});

// === Render inbox ===
function renderInbox() {
  emailList.innerHTML = '';
  emails.forEach((email, index) => {
    const li = document.createElement('li');
    li.className = email.read ? '' : 'unread';
    li.innerHTML = `
      <span class="email-sender">${email.sender}</span>
      <span class="email-subject">${email.subject}</span>
    `;
    li.addEventListener('click', () => openEmail(index));
    emailList.appendChild(li);
  });
}

// === Open email preview ===
function openEmail(index) {
emails[index].read = true; // <-- marks this email as read

  const email = emails[index];
  emailPreview.innerHTML = `
    <h2>${email.subject}</h2>
    <p><strong>From:</strong> ${email.sender}</p>
    <p><strong>To:</strong> ${userEmail}</p>
    <p><strong>Date:</strong> ${email.date}</p>
    <hr>
    <p>${email.body}</p>
  `;

  renderInbox(); // refresh the list to remove "unread" class if needed

  // --- Watch for Reddit link clicks ---
    let clickTriggered = false; //to prevent new emails being added multiple time if this user clicks the link more then once
    const redditLink = emailPreview.querySelector('a[href*="reddit.com"]');
    if (redditLink && !clickTriggered) {
      redditLink.addEventListener('click', () => {
      clickTriggered = true;
        console.log("Reddit link clicked — new email coming soon...");

        // Wait a minute, then add a new email into the inbox
        setTimeout(() => {
        playEmailSound();
          addNewEmail({
                sender: 'unknown@warning.net',
                    subject: 'STOP YOUR RESEARCH',
                    date: '—',
                    body: 'You should not dig any further. Some things are better left unknown.',
                    read: false
          });
        }, 60000);

        setTimeout(() => {
        playEmailSound();
          addNewEmail({
            sender: 'unknown@tips.net',
            subject: 'Check out the audio file',
            date: '—',
            body: 'Make sure to check out an audio file for Rust and Ruin someone mentioned on Reddit!',
            read: false
          });
        }, 300000); // clue after 5 minutes
      });
    }
  }


logoutBtn.addEventListener('click', () => {
  inboxPage.classList.add('hidden');
  loginContainer.classList.remove('hidden');
  loginMsg.textContent = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';

  //RESET//
  currentUser = '';
    userEmail = '';
    emailPreview.innerHTML = '<div class="preview-placeholder">Select an email to read</div>';
    emailList.innerHTML = '';

    const inboxTitle = document.getElementById('inboxTitle');
    inboxTitle.textContent = 'Inbox';
});

function addNewEmail(email) {
  emails.unshift(email);  // put new message at top
  renderInbox();          // refresh the list
}
