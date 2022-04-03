module: {
  rules: [
     {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ["@babel/preset-env"]
        }
     }
  ]
}