const http = require('http');
const fs = require('fs');
const port = 3000;

const defaultHTML = fs.readFileSync('home.html', 'utf-8');
const contactusHTML = fs.readFileSync('contact.html', 'utf-8');
const loginHTML = fs.readFileSync('login.html', 'utf-8');
const signupHTML = fs.readFileSync('signup.html', 'utf-8');
const contactHTML = fs.readFileSync(`contact.html`, `utf-8`);
const feedback = fs.readFileSync(`contactFormData.txt`, `utf-8`);

const indexHTML = `<h1><br/></h1>
    <div class="description">
      <h1>
        Discover and Immerse<br />Yourself in the World of Books!<br />From
        timeless classics to modern<br />masterpieces, we bring the best
        <br />of literature to your fingertips. <br />There’s a book for
        everyone.
      </h1>

      <!-- <div class="displayPictures">
        <img src="./images/novel logo.jpg" alt="" />
        <img src="./images/scripts logo.jpg" alt="" class="displayPicture2" />
      </div> -->
    </div>

    <br /><br /><br /><br />

    <div class="content">
      <p class="genres">Genres to Explore:</p>

      <ul>
        <li>Fiction</li>
        <li>Non-fiction</li>
        <li>Mystery & Thriller</li>
        <li>Fantasy & Sci-Fi</li>
        <li>Romance</li>
        <li>Historical</li>
        <li>Young Adlit</li>
        <li>Self-Help</li>
        <li>And more!</li>
      </ul>
    </div>
    <br /><br />

      <a href="./login.html" target="_blank"
        ><button type="button" class="free">Log in</button></a
      >
    </div>
    <br /><br /><br />

    <p class="conclusion">
      World Library is used by over 87 million people and over 15 million teams
      all over the world.
    </p>`

const aboutHTML = `
        <p class="about">ABOUT US</p> 
      <main>
        <div id="justify">
          <p class="justify" id="justify1">Our website was created with the goal of providing unlimited access to various sources of information and knowledge for our millions of readers around the world.</p> 
          <p class="justify" id="justify2">Do you crave knowledge? Or maybe something exciting to pass the time? Is there a bit of history that you yearn to learn about? Here at <strong> World Library&copy;</strong>, we make sure to provide 
          the best quality books for whatever needs you have. Ranging from history and philosophy books to fan 
          fiction and light novels, as well as self-help and motivational books to help you in your day-to-day life 
          challenges.</p> 
          <br>
          <p class="justify" id="justify3">At <strong>World Library&copy;</strong>, we believe that knowledge is a powerful tool for 
          transformation and growth. Our carefully curated selection spans across multiple genres and interests, 
          designed to offer a diverse reading experience for everyone. From those pursuing academic knowledge to casual readers looking for a riveting novel,
          we ensure that every reader finds something that sparks joy, curiosity, and inspiration.</p>
          <p class="justify" id="justify4">In an age where information is at your fingertips, we aim to be your trusted partner in navigating
          the sea of content out there. We go beyond just providing books — our platform fosters a love for learning and encourages continuous growth by offering handpicked 
          materials that are relevant, insightful, and engaging. 
          Whether you're researching historical events, delving 
          into philosophical questions, or seeking personal 
          motivation, we provide the resources that empower you.</p> 
          <p class="justify" id="justify5">Join the millions of readers who trust 
          <strong>World Library&copy;</strong> to fulfill their 
          reading and learning desires. Discover new worlds, gain 
          fresh perspectives, and enrich your life through the power 
          of books. Together, we strive to create a global community 
          united by the love for literature and knowledge.</p>
        </div>
    </main>
`

function handlePostData(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = new URLSearchParams(body);
    const formData = Object.fromEntries(data.entries());
    callback(formData);
  });
}

	// Create a server
	const server = http.createServer((req, res) => {
		if(req.url === "/" || req.url === "/home.html"){
			res.end(defaultHTML.replace('{{%CONTENT%}}', indexHTML));
		}
		else if(req.url === "/about.html"){
			res.end(defaultHTML.replace('{{%CONTENT%}}', aboutHTML));
		}
		else if(req.url === "/contact.html"){
      res.end(contactHTML);
		}
		else if(req.url === "/login.html"){
			res.end(loginHTML);
		}
    else if(req.url === "/product.html"){
			res.end(productHTML);
		}
    else if (req.method === 'POST' && req.url === '/submit-contact'){
    handlePostData(req, formData => {
      const formDataString = `Surname: ${formData.ssname}\nFirst name: ${formData.ffname}\nEmail: ${formData.emaill}\nPhone number: ${formData.pNumberr}\nComplaint: ${formData.complaint}\n-----\n\n\n`;

      fs.appendFile('contactFormData.txt', formDataString, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error saving form data');
          return;
        }else
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Form data saved successfully.`);
      });
    });
    }else{
			res.writeHead(404, {"content-Type": "text/plain"});
      res.end(`Page not found.`);
		}
});

server.listen(port, 'localhost', () => {
  console.log(`A request was sent.`);
});
