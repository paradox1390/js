import { Octokit } from "https://esm.sh/octokit";

const githubKey =
  "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";

class GitHubServices {
  constructor(selector, btnNext, btnPrev) {
    this.#octokit = new Octokit({ auth: this.#githubKey });
    this.selector = selector;
    this.btnNext = document.querySelector(btnNext);
    this.btnPrev = document.querySelector(btnPrev);
    this.btnNext.onclick = this.next;
    this.btnPrev.onclick = this.prev;
    this.init();
  }
  #userInfo = [];
  #octokit;
  #pagination = [0];
  #NextPage = 0;
  #githubKey =
    "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";

  getUsers = async (id) => {
    const result = await this.#octokit.request(
      `GET /users?per_page=12&since=${id}`
    );
    console.log(result.data);
    this.#userInfo = result.data;
    return result.data;
  };
  getFullName = async (login) => {
    const result = await this.#octokit.request(`GET /users/${login}`);
    return result.data.name;
  };

  getOrganizationList = async (login) => {
    const { data } = await this.#octokit.request(`GET /users/${login}/orgs`);
    const res = [];
    data.forEach((org) => {
      res.push({ login: org.login });
    });
    return res;
  };
  getFollowers = async (login) => {
    const firstPage = await this.#octokit.request(
      `GET /users/${login}/followers`
    );
    const followers = {};

    followers.link = `https://github.com/${login}?tab=followers`;
    followers.count = firstPage.data.length;
    if (firstPage.headers.link) {
      const page = firstPage.headers.link.match(/page=\d+/g);
      const { data } = await this.#octokit.request(
        `GET /users/${login}/followers?${page[1]}`
      );
      const numPage = page[1].match(/\d+/g);
      followers.count = followers.count * (+numPage - 1) + data.length + 1;
    }
    return followers;
  };

  getRepos = async (login) => {
    const firstPage = await this.#octokit.request(`GET /users/${login}/repos`);
    const repos = {};
    repos.link = `https://github.com/${login}?tab=repositories`;
    repos.count = firstPage.data.length;
    if (firstPage.headers.link) {
      const page = firstPage.headers.link.match(/page=\d+/g);
      const { data } = await this.#octokit.request(
        `GET /users/${login}/repos?${page[1]}`
      );
      const numPage = page[1].match(/\d+/g);
      repos.count = repos.count * (+numPage - 1) + data.length;
    }
    return repos;
  };
  getOrganizationInfo = async (org) => {
    const { data } = await this.#octokit.request(`GET /orgs/${org.login}`);
    org.name = data.name;
    org.logoUrl = data.avatar_url;
  };
  getFullInfo = async () => {
    await Promise.all(
      this.#userInfo.map(async (user) => {
        user.organization = await this.getOrganizationList(user.login);
        user.name = await this.getFullName(user.login);
        user.followers = await this.getFollowers(user.login);
        user.repositories = await this.getRepos(user.login);
      })
    );

    const promiseArr = [];
    this.#userInfo.forEach((user) => {
      if (user.organization.length) {
        user.organization.forEach((org) => {
          promiseArr.push(this.getOrganizationInfo(org));
        });
      }
    });
    await Promise.all(promiseArr);
    console.log(this.#userInfo);
  };

  render = () => {
    const app = document.querySelector(this.selector);
    const fragment = document.createDocumentFragment();
    this.#userInfo.forEach((user) => {
      const divCard = document.createElement("div");
      divCard.classList.add("user__card");
      const imgAvatarUser = document.createElement("img");
      imgAvatarUser.classList.add("user__avatar");
      imgAvatarUser.src = user.avatar_url;

      const divTextInfo = document.createElement("div");
      const pName = document.createElement("p");
      pName.innerText = user.name ? user.name : `—`;
      pName.classList.add("user__name");
      const pLogin = document.createElement("p");
      pLogin.innerText = `Login: ${user.login}`;
      pLogin.classList.add("user__login");
      const pFollowers = document.createElement("p");
      pFollowers.innerText = "Followers: ";
      pFollowers.classList.add("user__followers");
      const linkFollowers = document.createElement("a");
      linkFollowers.href = user.followers.link;
      linkFollowers.innerText = user.followers.count;
      const pReps = document.createElement("p");
      pReps.innerText = "Repositories: ";
      pReps.classList.add("user__repositories");
      const linkReps = document.createElement("a");
      linkReps.href = user.repositories.link;
      linkReps.innerText = user.repositories.count;
      const link = document.createElement("a");
      link.href = user.html_url;
      link.innerText = "Link to GitHub acc";
      const { organization } = user;
      const divOrgContainer = document.createElement("div");
      if (organization.length) {
        organization.forEach((org) => {
          const divOrgInfo = document.createElement("div");
          divOrgInfo.classList.add("org_container");
          const divOrgAvatar = document.createElement("img");
          divOrgAvatar.classList.add("org_img");
          divOrgAvatar.src = org.logoUrl;
          divOrgAvatar.alt = org.name ? org.name : org.login;
          const spanNameOrg = document.createElement("span");

          spanNameOrg.innerText = org.name ? org.name : org.login;
          divOrgInfo.append(divOrgAvatar, spanNameOrg);
          divOrgContainer.append(divOrgInfo);
          divOrgContainer.classList.add("user__organization");
        });
      }
      pFollowers.append(linkFollowers);
      pReps.append(linkReps);
      divTextInfo.append(
        pName,
        pLogin,
        pReps,
        pFollowers,
        link,
        divOrgContainer.hasChildNodes() ? divOrgContainer : ""
      );
      divCard.append(imgAvatarUser, divTextInfo);
      fragment.append(divCard);
    });
    app.innerText = "";
    app.append(fragment);
  };
  init = async () => {
    const app = document.querySelector(this.selector);
    app.innerText = "LOADING....";
    await this.getUsers(this.#pagination[0]);
    this.#pagination.push(this.#userInfo[11].id);
    this.#NextPage += 1;
    await this.getFullInfo();
    this.render();
  };
  next = async () => {
    const app = document.querySelector(this.selector);
    app.innerText = "LOADING....";

    await this.getUsers(this.#pagination[this.#NextPage]);
    this.#pagination.push(this.#userInfo[11].id);
    this.#NextPage += 1;
    await this.getFullInfo();
    this.render();
    if (this.#pagination.length) {
      this.btnPrev.disabled = false;
    }
  };
  prev = async () => {
    const app = document.querySelector(this.selector);
    app.innerText = "LOADING....";

    await this.getUsers(this.#pagination[this.#NextPage - 2]);
    this.#NextPage -= 1;
    this.#pagination.pop();
    await this.getFullInfo();
    this.render();
    if (this.#pagination.length <= 2) {
      this.btnPrev.disabled = true;
    }
  };
}

const app = new GitHubServices(".app", ".next", ".prev");
