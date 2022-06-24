<div align="center" style="background:black;">
  <img alt="logo" src="client/public/git/logo.png">
</div>

# Survey App

Survey app created with React, divided into two sections: one exclusive for the **Creators** and another for the **Participants**. <br /><br />
Survey research to assess thoughts, opinions and feelings from the users.

## Technologies

This project was created with:

-   Front-End: HTML, CSS, JS ([Create React App](https://github.com/facebook/create-react-app))
-   Back-End: [Node.js](https://nodejs.org/en/about/) / [Express](http://expressjs.com)
-   Data: [PostgreSQL](https://www.postgresql.org)

## Setup

First of all clone the repo on your own machine

```bash
git clone https://github.com/lmguerrini/survey-app.git
```

Install all the dependencies required

```bash
npm install
```

Start the server

```bash
npm run dev
```

Now you should be ready to dive into the Survey App at http://localhost:3000

## Main features

-   #### `Creators:`
    -   Create new customized surveys
    -   Get results and insights from collected users data
-   #### `Participants:`
    -   Fill in a pre-selected survey via shared link
        <br />

## Preview

### Creators - Home

![](client/public/git/creator/creator-survey-home.png)

### Create New Survey

![](client/public/git/creator/creator-new-survey.png)

-   #### Type of Question: `Range`

![](client/public/git/creator/creator-new-survey-range.gif) &emsp;
![](client/public/git/creator/creator-new-survey-range.png)

-   #### Type of Question: `Choose 1 answer`

![](client/public/git/creator/creator-new-survey-choose1.gif) &emsp;
![](client/public/git/creator/creator-new-survey-choose1.png)

-   #### Type of Question: `Choose 1+ answers`

![](client/public/git/creator/creator-new-survey-choose1+.gif) &emsp;
![](client/public/git/creator/creator-new-survey-choose1+.png)

-   #### Type of Question: `Text`

![](client/public/git/creator/creator-new-survey-text.gif) &emsp;
![](client/public/git/creator/creator-new-survey-text.png)

### Shareable link for participants

![](client/public/git/creator/creator-new-survey-created.gif) &emsp;
![](client/public/git/creator/creator-new-survey-created.png)

### Results & Insights

![](client/public/git/creator/creator-choose-survey.png)

-   #### Results

    ![](client/public/git/creator/creator-survey-results.gif)

-   #### Results: normal view

    ![](client/public/git/creator/creator-survey-results.png)

-   #### Results: expanded view w/ chart insights

    ![](client/public/git/creator/creator-survey-results-expanded.png)

### Participants - Start Survey

![](client/public/git/participant/participant-start-survey.png)

### Fill in pre-selected Survey

![](client/public/git/participant/participant-survey.gif) &emsp;
![](client/public/git/participant/participant-survey-fillout.png)

### Survey submitted

![](client/public/git/participant/participant-survey-submitted.png)

---

[**![](client/public/git/creator/logoW.png)**](#survey-app)
