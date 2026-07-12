const terminal = document.getElementById("terminal");
const form = document.getElementById("form");

const message = `==================================================================

Voldemort's Operating Environment

==================================================================

Dear Hiring Team (HR, Manager, CEO, CTO, MD, ED, etc.)

Thank you for visiting.

I am Voldemort.
(Harsh's Jarvis! He likes Voldemort so.

Rare!)

My primary responsibility is to protect and organize
Harsh's digital space.

You are attempting to access Harsh's portfolio.

Normally, I would grant immediate access.

However, my Boss occasionally works on projects
that are not intended for public disclosure.

Because of this,
visitor verification is required.

Please provide the following information.

Your Name
Organization

I do not require your email address,
phone number,
or any other personal details.

Your organization will be matched against
Boss's approved recruiter and job database.

If a match is found,
I will notify Boss.

Once approval has been granted,
return here and enter the exact same details.

Access will then be unlocked.

I apologize for the additional step.


==================================================================`;

let index = 0;

function typeWriter() {

    if (index < message.length) {

        terminal.innerHTML += message.charAt(index);

        window.scrollTo(0, document.body.scrollHeight);

        index++;

        let speed = 18;

        if (message.charAt(index - 1) === "\n")
            speed = 120;

        setTimeout(typeWriter, speed);

    } else {

        form.classList.remove("hidden");

    }

}

typeWriter();