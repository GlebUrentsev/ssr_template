import path from "path";
import nodeExternals from "webpack-node-externals";
import webpack, { Configuration } from "webpack";
import { config } from "dotenv";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

config();

export const mode = process.env.NODE_ENV || "development";

export const serverConfig: Configuration = {
  // @ts-ignore
  mode,
  target: "node",
  devtool: "inline-source-map",
  entry: {
    server: path.join(__dirname, "..", "src", "server", "server.ts"),
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["babel-loader"],
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
      },
    ],
  },
};
