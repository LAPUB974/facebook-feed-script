(function (window, document) {
  const originalOnload = window.onload;

  window.onload = function () {
    if (typeof originalOnload === "function") {
      originalOnload();
    }

    window.initFacebookFeed = function (pageId, accessToken) {
      const feedContainer = document.getElementById("facebook-feed");
      if (!feedContainer) {
        console.error("Facebook feed container not found");
        return;
      }

      document.body.style.fontFamily = "Open Sans, sans-serif";

      const div = document.createElement("div");

      div.style.display = "grid";
      div.style.gridTemplateColumns = "repeat(auto-fill, minmax(223px, 1fr))";
      div.style.gridAutoRows = "auto";
      div.style.gridAutoFlow = "dense";
      div.style.gap = "16px";
      div.style.margin = "auto";
      div.style.width = "fit-content";
      div.style.maxWidth = "100%";
      div.style.color = "rgb(101, 100, 100)";
      div.style.border = "none";

      const fetchData = async () => {
        try {
          const data = await fetch(
            `https://deno-facebook-module.deno.dev/api/feed/${pageId}`
          );

          console.log(data);
          const res = await data.json();

          const pageInfo = res.pageInfo;
          const postsData = res.posts;

          const createPostCard = (post) => {
            const card = document.createElement("a");
            card.href = `https://www.facebook.com/${post.id}`;
            card.target = "_blank";
            card.style.textDecoration = "none";
            card.style.color = "inherit";
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.maxWidth = "100%";
            card.style.border = "1px solid rgba(238,238,238,1)";
            card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            card.style.borderRadius = "3px";
            card.style.overflow = "hidden";
            card.style.height = "auto";

            if (post.full_picture) {
              const imgContainer = document.createElement("div");
              imgContainer.style.width = "100%";
              imgContainer.style.height = "223px";
              imgContainer.style.overflow = "hidden";
              imgContainer.style.display = "flex";
              imgContainer.style.alignItems = "center";
              imgContainer.style.justifyContent = "center";

              const img = document.createElement("img");
              img.src = post.full_picture;
              img.style.width = "100%";
              img.style.height = "100%";
              img.style.objectFit = "contain";
              img.style.aspectRatio = "1/1";
              img.style.objectPosition = "center";
              img.alt = "Post image";

              imgContainer.appendChild(img);
              card.appendChild(imgContainer);
            } else {
              card.style.gridRowEnd = "span 2";
            }

            const title = document.createElement("h2");
            title.textContent = post.message;
            title.style.fontSize = "0.750rem";
            title.style.fontWeight = "normal";
            title.style.margin = "12px";
            title.style.textOverflow = "ellipsis";
            title.style.maxHeight = "40px";
            title.style.display = "-webkit-box";
            title.style.webkitLineClamp = "2";
            title.style.webkitBoxOrient = "vertical";
            title.style.overflow = "hidden";
            card.appendChild(title);

            const date = document.createElement("p");
            date.textContent = new Date(post.created_time).toLocaleDateString();
            date.style.fontSize = "0.625rem";
            date.style.margin = "0 12px 0 12px";
            card.appendChild(date);

            const pageInfoDiv = document.createElement("div");
            pageInfoDiv.style.display = "flex";
            pageInfoDiv.style.backgroundColor = "#f4f4f4";
            pageInfoDiv.style.marginTop = "12px";
            pageInfoDiv.style.padding = "5px 10px";

            const logo = document.createElement("img");
            logo.src = pageInfo.picture.data.url;
            logo.alt = "Page logo";
            logo.style.width = "30px";
            logo.style.height = "30px";
            logo.style.borderRadius = "50%";
            logo.style.marginRight = "8px";
            pageInfoDiv.appendChild(logo);

            const pageTitle = document.createElement("span");
            pageTitle.textContent = pageInfo.name;
            pageTitle.style.fontSize = "0.625rem";
            pageTitle.style.fontWeight = "normal";
            pageTitle.style.color = "#616161)";
            pageInfoDiv.appendChild(pageTitle);

            card.appendChild(pageInfoDiv);

            return card;
          };

          postsData.forEach((post) => {
            const card = createPostCard(post, pageInfo);
            div.appendChild(card);
          });

          feedContainer.appendChild(div);

          return { pageInfo: pageInfo, posts: postsData };
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      fetchData();
    };

    const feedContainer = document.getElementById("facebook-feed");
    if (feedContainer && feedContainer.dataset.pageId) {
      window.initFacebookFeed(
        feedContainer.dataset.pageId,
        feedContainer.dataset.accessToken
      );
    }
  };
})(window, document);
