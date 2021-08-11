import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../common/App";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import configureStore from "../common/store";
import { MatchedRoute, matchRoutes } from "react-router-config";
import routes from "../common/routes";
import { Store } from "redux";
import serialize from "serialize-javascript";

function readHtml() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

function preloadData(
  branch: MatchedRoute<any>[],
  store: Store
): Promise<any>[] {
  const fetchDataQueue = [];
  branch.forEach(({ route }) => {
    if (route.fetchData && route.fetchData.length) {
      route.fetchData.forEach((handler) => {
        fetchDataQueue.push(store.dispatch(handler()));
      });
    }
  });

  return fetchDataQueue;
}

export function bootstrap(req, res) {
  const store = configureStore({});
  const branch = matchRoutes(routes, req.path);
  Promise.all(preloadData(branch, store)).then(() => {
    readHtml()
      .then((data: string) => {
        const url = req.url || req.originalUrl;
        const context = {};
        const markup = renderToString(
          <Provider store={store}>
            <StaticRouter location={url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        );
        const helmet = Helmet.renderStatic();
        data = data.replace(
          "<script>window.INITIAL_DATA</script>",
          `<script>window.INITIAL_DATA = ${serialize(
            store.getState()
          )}</script>`
        );
        data = data.replace("<title></title>", `${helmet.title}`);
        data = data.replace(
          '<div id="root"></div>',
          `<div id="root">${markup}</div>`
        );

        res.send(data);
      })
      .catch((e) => {
        res.send(`Error ${e}`);
      });
  });
}
