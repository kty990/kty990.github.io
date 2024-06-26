import pjcts, { GetColorFromLang } from '../js/projects.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errors = [];
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.errors.push({ error: error, stack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          {this.errors.map(e => <p> {`${e}`} </p>)}
        </div>
      )
    }

    return this.props.children;
  }
}

const changeActive = (e) => {
  let ex = document.getElementById("active-nav");
  if (ex) {
    ex.id = "";
  }
  e.id = "active-nav";
}


function Stories() {
  setTimeout(() => {
    let elements = document.getElementsByClassName("nav-link");
    for (let x of elements) {
      if (x.textContent == "Stories") {
        changeActive(x);
        break;
      }
    }
    // setCount(count + 1);
  }, 200);

  setTimeout(() => {
    const audio = document.getElementById("templeos-audio");
    const parentDiv = document.getElementById('templeos');

    // Function to check if the parent div is visible
    function isParentDivVisible() {
      const rect = parentDiv.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Function to play audio when parent div is visible
    function playAudioIfVisible() {
      if (isParentDivVisible()) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    // Event listener for visibility change
    document.addEventListener('scroll', playAudioIfVisible);

    // Play audio if parent div is already visible on page load
    playAudioIfVisible();

  })

  document.title = "History and Stories";

  return (
    <div id="main-stories">
      <p id="title">Stories</p>
      <div id="story-list">
        <div id="templeos" class="story">
          <p id="title">TempleOS - Terry A. Davis</p>
          <p>
            <strong>Early Life and Career:</strong>
            Terry A. Davis, born in 1969, graduated with a degree in electrical engineering from the Colorado
            School of Mines. He worked in the tech industry at companies like Ticketmaster and 3DO, gaining
            valuable experience in software development.
            <br /><br />
            <strong>Divine Calling and the Birth of TempleOS:</strong>
            <br /><br />
            In the early 2000s, Terry Davis claimed that God had given him a divine mission to create an
            operating system. He embarked on this journey, initially naming the project "LoseThos." However, he
            later renamed it "TempleOS" to reflect his belief that it was a temple for God.
            <br /><br />
            <strong>The Creation of HolyC:</strong>
            <br /><br />
            To build TempleOS, Terry created a programming language called "HolyC." This language was designed
            to be closely integrated with the TempleOS environment. It was essentially a dialect of the C
            programming language but with unique features tailored for the 16-bit, 640x480 VGA display of
            TempleOS.
            <br /><br />
            <strong>Distinctive Features of HolyC:</strong>
            <br /><br />
            Interpreted Nature:
            HolyC was an interpreted language, allowing code to be executed directly by
            TempleOS.
            Dynamic Typing: It supported dynamic typing, allowing variables to change data types during runtime.
            Integration with TempleOS: HolyC allowed for low-level system access and interaction with the
            TempleOS environment.
            No Memory Protection: Unlike modern languages, HolyC lacked memory protection, demanding careful
            programming to avoid system crashes.
            Mental Health Struggles and Isolation:
            Throughout his work on TempleOS, Terry Davis faced mental health challenges, including schizophrenia
            and bipolar disorder. He often made eccentric and controversial statements, which led to his
            isolation from mainstream programming communities.
            <br /><br />
            <strong>Legacy and Passing:</strong>
            <br /><br />
            Terry Davis tragically passed away in 2018. His legacy lives on through TempleOS and HolyC, which
            were made open source after his death. Despite the unique and unconventional nature of his work and
            the challenges he faced, TempleOS and HolyC continue to be discussed and remembered online.
            <br /><br />
            The combination of Terry Davis's vision, his divine calling, and the creation of HolyC resulted in
            the development of TempleOS, a unique and controversial operating system with a dedicated but
            limited following in the world of technology.
            <br /><br /><br />
          </p>
          <a href="https://templeos.org/">Visit templeos.org</a>
          <audio id="templeos-audio" src="../sounds/templeos_songs.mp3"></audio>
        </div>
        <div id="hazel" class="story">
          <p id="title">Hazel - Yan Chernikov</p>
          <p>
            Yan Chernikov, also known as <strong>"TheCherno"</strong>, is a popular YouTuber and game developer
            who has gained
            recognition for his educational content related to game development, programming, and his work on
            the game engine known as "Hazel." While Yan Chernikov's channel primarily focuses on game
            development, he has a long history in the field. Below is a detailed history of his journey and his
            game engine, Hazel:
            <br /><br />
            <strong>Early Years and Interest in Programming:</strong>
            <br /><br />
            Yan Chernikov's passion for programming and game development began at a young age. He showed an
            early interest in technology and coding.
            <br /><br />
            <strong>YouTube Channel:</strong>
            <br /><br />
            TheCherno started his YouTube channel in 2012, primarily to share his experiences and knowledge
            about game development. His channel has since grown significantly, becoming a valuable resource for
            aspiring game developers.
            <br /><br />
            <strong>Popular Series:</strong>
            <br /><br />
            Yan's channel is known for its educational series, where he creates games from scratch and explains
            every step of the development process. Some of his most popular series include "Game Engine Series,"
            "OpenGL Series," and "Game Development in C++."
            <br /><br />
            <strong>Development of Hazel:</strong>
            <br /><br />
            One of the major highlights of TheCherno's career is the development of the game engine known as
            "Hazel." He started this project as part of his YouTube series, "Game Engine Series," in which he
            created a game engine from the ground up.
            <br /><br />
            <strong>Features of Hazel:</strong>
            <br /><br />
            Hazel is built using C++ and is designed to be a versatile and high-performance game engine. Yan put
            a lot of emphasis on developing features like a 2D rendering system, a 3D rendering engine, a
            scripting system, and a robust entity-component system.
            <br /><br />
            <strong>Educational Content:</strong>
            <br /><br />
            Throughout the development of Hazel, Yan Chernikov documented the entire process on his YouTube
            channel. He provided insights into the challenges, design decisions, and coding techniques involved
            in building a game engine.
            <br /><br />
            <strong>Community Engagement:</strong>
            <br /><br />
            TheCherno has developed a strong online community of game developers, programmers, and students
            interested in game development. He engages with his audience through live streams, Q&A sessions, and
            discussions on various programming and game development topics.
            <br /><br />
            <strong>Impact and Recognition:</strong>
            <br /><br />
            Yan Chernikov's work has received recognition from the game development community. His educational
            content has helped numerous aspiring game developers to learn the intricacies of game development
            and programming.
            <br /><br />
            <strong>Future Development:</strong>
            <br /><br />
            Hazel continues to evolve, and TheCherno periodically provides updates and improvements to the
            engine. He remains dedicated to enhancing the engine and expanding its capabilities.
            Yan Chernikov's journey from a young programmer to a popular YouTuber and game engine developer has
            been marked by his dedication to educating and inspiring the next generation of game developers. His
            work on Hazel, in particular, has provided a valuable resource for those interested in creating
            their own game engines and games.
          </p>
          <a href="https://hazelengine.com/">Visit hazelengine.com</a>
        </div>
      </div>
    </div>
  );
}

export { Stories };