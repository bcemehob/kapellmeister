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

## Application build

Standalone server application can be made with Vercel pkg

## Start server:

```
npm run start
```
Or

```
node backend.js
```

## Build application:

From application root folder

```
pkg .
```
to define target builds update array in `package.json -> pkg -> targets`

example values (`nodeRange`-`platform`-`architecture`):

* `node16-macos-arm64`
* `node16-linux-arm64`
* `node16-win-x64`

## Add folder with assets

to add `/folder-name` folder to assets being snapshotted by pkg:
```
app.use(express.static(path.join(__dirname, 'folder-name')))
```







