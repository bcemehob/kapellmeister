# Frontend
## Kapellmeister

- Kapellmeister is a simple App, where you can create music patterns to be shown in rhytm, displaying musicians playing their 

## Structure of Application

* Real-time conductor
* Pattern editor


## Improvements.
Things I'll be working later on to improve the app:
```
 Real-time conductor
 Pattern editor

 ```


# Backend


## Start server:

```
npm run start
```
Or

```
node backend.js
```



## Build standalone application:

Standalone server application can be made with Vercel pkg

### Standalone build steps

#### 1. Define target build

To define target builds depending on desired OS update array in `package.json -> pkg -> targets`

NB! Some issues detected when target application OS differs from OS running on machine where build is performed.

I.e. we could not create a working Windows application build on Mac, using the `node16-win-x64` command

Example values (pattern: `nodeRange`-`platform`-`architecture`):

* `node16-macos-arm64`
* `node16-linux-arm64`
* `node16-win-x64`


#### 2. Install Kapellmeister

```
npm install
```

#### 4. Use custom folder with assets (optional)

To customize `/folder-name` folder with assets being put into the snapshot by pkg:
```
app.use(express.static(path.join(__dirname, 'folder-name')))
```

#### 3. Build frontend 

```
npm run build
```
It will create assets in the `dist` folder

#### 5. Build the app

From application root folder

```
pkg .
```
As a result the distributable package appears in the root of project.

NB! Do not stage it into the GIT repository!







