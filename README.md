# Forms shared

## dev-server

The dev server contains Tailwind CSS styled form and layout elements

### Run the server

```bash
cd dev-server
npm run start
```

### Watch files

With the server running ppen another terminal window

```bash
npm run watch
```

### Publish CSS to the WordPress theme

```bash
npm run build 
npm run copy
```



## WordPress Container

Resetting you DB in dev container: `wp db reset --allow-root`