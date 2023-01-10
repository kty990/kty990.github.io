@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Rubik+Vinyl&family=Trispace:wght@100&display=swap');
/*font-family: 'Rubik Vinyl', cursive;*/
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Rubik+Vinyl&family=Shadows+Into+Light&family=Trispace:wght@100&display=swap');
/*font-family: 'Shadows Into Light', cursive;*/
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Rubik+Vinyl&family=Shadows+Into+Light&family=Trispace:wght@100&family=Yanone+Kaffeesatz:wght@300;400;700&display=swap');
/*font-family: 'Yanone Kaffeesatz', sans-serif;*/

@keyframes ham_hover {
    from {
        color: #522a82;
        background-color: #7a28a0;
    }

    to {
        color: #000;
        background-color: #fff;
    }
}

@keyframes reveal {
    from {
        left: -310px;
    }

    to {
        left: 0px;
    }
}

body,
html {
    margin: 0;
    padding: 0;
    user-select: none;
}

#body_bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
}

#site-title {
    text-align: center;
    font-size: 1em;
    user-select: none;
    font-family: 'Rubik Vinyl', cursive;
}

/** Inactive */
#hamburger {
    position: relative;
    display: inline-block;
    padding-top: 0vh;
    padding-bottom: calc(var(--vh, 1vh) * 1.5);
    padding-left: calc(var(--vh, 1vh) * 1);;
    padding-right: calc(var(--vh, 1vh) * 1);;
    left: 105%;
    width: calc(var(--vh, 1vh) * 5);;
    height: calc(var(--vh, 1vh) * 5);;
    font-size: calc(var(--vh, 1vh) * 1.25);;
    color: #2c0957;
    background-color: #7a28a07d;
    border-radius: calc(var(--vh, 1vh) * 1);;
    border-width: calc(var(--vh, 1vh) * 0.25);;
    border-style: solid;
    border-color: #24031b;
    transition: background-color 0.25s;
}

#hamburger:hover {
    color: #000;
    background-color: #ffffffcc;
    cursor: pointer;
}

#nav-flexbox {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    margin-top: calc(var(--vh, 1vh) * -5);;
}

#nav-container {
    z-index: 100;
    position: fixed;
    left: calc(var(--vh, 1vh) * -21);;
    height: 100%;
    width: calc(var(--vh, 1vh) * 20);;
    backdrop-filter: blur(2px);
    text-decoration: none;
    background-color: #000000cc;
    border-right: #fff;
    border-top: #00000000;
    border-left: #00000000;
    border-style: solid;
    white-space: nowrap;
    transition: left 0.5s;
    user-select: none;
}

#nav-container_active {
    z-index: 100;
    position: fixed;
    height: 100%;
    width: calc(var(--vh, 1vh) * 20);;
    backdrop-filter: blur(2px);
    text-decoration: none;
    background-color: #000000cc;
    border-right: #fff;
    border-top: #00000000;
    border-left: #00000000;
    border-style: solid;
    white-space: nowrap;

    animation-name: reveal;
    animation-duration: 0.5s;
    animation-direction: normal;
    left: 0px;

    user-select: none;
}

#nav-icon {
    width: calc(var(--vh, 1vh) * 15);;
    height: calc(var(--vh, 1vh) * 15);;
    position: relative;

    border-radius: 100px;
    border-color: #fff;
    border-style: solid;
    /* border-width: 2px; */
}

.nav-link {
    color: #5c2f93;
    text-decoration: none;
    padding-top: calc(var(--vh, 1vh) * 2);;
    padding-bottom: calc(var(--vh, 1vh) * 2);;
    font-size: calc(var(--vh, 1vh) * 4);;
    font-family: 'Yanone Kaffeesatz', sans-serif;
}

.nav-link-first {
    margin-top: calc(var(--vh, 1vh) * 5);;
}

.nav-link:hover {
    color: #8c42e6;
    cursor: pointer;
}

#nav-active {
    color: #9947fd;
}

#scroll-page {
    position: absolute;
    top: calc(var(--vh, 1vh) * 100);;
    background-color: #220530;
    display: block;
    width: 100%;
    padding: 0;
    padding-bottom: 27px;
    margin: 0;
    z-index: 5;
}

#nav-separator {
    width: 75%;
    height: 1px;
    background-image: linear-gradient(0.25turn, #000, #fff, #000);
    display: block;
    position: relative;
    top: calc(var(--vh, 1vh) * 3);;
}

#disclaimer {
    position: absolute;
    display: block;
    background-color: #000;
    left: 0px;
    width: 100%;
    padding: 0;
    margin: 0;
}

#disclaimer>p {
    /* padding-left: 100px; */
    color: #fff;
    text-align: center;
    font-size: calc(var(--vh, 1vh) * 2);;
    font-family: 'Shadows Into Light', cursive;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    padding-top: 5px;
    padding-bottom: 5px;
}

.hr-padding {
    margin-bottom: 30px;
}

.center-horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.separator {
    display: block;
    height: 1px;
    background-image: linear-gradient(0.25turn, transparent, #fff, transparent);
    margin-bottom: 20px;
}

.skinny-separator {
    display: block;
    height: 1px;
    background-image: linear-gradient(0.25turn, transparent, transparent, #000, transparent, transparent);
    margin-bottom: 20px;
}

@media only screen and (max-width: 1080px) {
    #nav-icon {
        display: none;
    }

    #nav-flexbox {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        margin-top: calc(var(--vh, 1vh) * -7.2);;
    }

    #nav-separator {
        display: none;
    }

    #nav-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(var(--vh, 1vh) * 5);;
        z-index: 6;
        display: flex;
        flex-direction: column;
        background-color: #47074dd8;
        backdrop-filter: blur(6px);
        justify-content: center;
        align-items: center;
    }
    
    #nav-active { /* Active page link */
        color: #430a53;
        background-color: #3e1351;
        text-shadow: 0px 0px 3px #ff9ef2;
    }
    
    .nav-link-first {
        margin: 0;
    }

    .nav-link {
        padding-left: 5vw;
        padding-right: 5vw;
        text-decoration: none;
        color: #cccccc;
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-size: calc(var(--vh, 1vh) * 3);;
        background-color: #5f1280cc;
        padding-top: calc(var(--vh, 1vh) * 1);;
        padding-bottom: calc(var(--vh, 1vh) * 1);;
        border-color: #000;
        border-style: solid;
        border-width: 1px;
    }
    
    .nav-link:hover {
        color: #000000;
        background-color: #f487fecc;
    }

    #scroll-page {
        position: absolute;
        top: calc(var(--vh, 1vh) * 100);
        background-color: #220530;
        display: block;
        width: calc(var(--vw, 1vw) * 100);;
        padding: 0;
        padding-bottom: 27px;
        margin: 0;
        z-index: 5;
    }
}
