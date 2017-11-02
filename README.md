# Bookfinder book search app

## Development setup

```shell
# Sinatra API
$ bundle install

# Angular
$ npm install
$ npm install -g @angular/cli
```

## Development server (Sinatra)

```shell
export GOODREADS_KEY=yourkey
export GOODREADS_SECRET=yoursecret
```

Run `bundle exec rackup config.ru -p 4567` to serve the Sinatra API locally on port 4567. This setup will work when the
Angular app has been built for distribution, i.e. using `ng build`.

To use the Sinatra API with the live Angular development server i.e. `ng serve`, you must enable CORS, and specify the
appropriate API port within the Angular app.

## Development server (Angular)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag
for a production build.

## Deployment to Heroku

Create a deploy branch, build Angular, and `git add -f dist/` to make a build commit. Push this up with
`git push heroku deploy_branch_name:master`
