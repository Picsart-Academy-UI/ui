File-Folder Structure
============================
### A top-level folders and files.
    .
    ├── build                               # Compiled files
    ├── docs                                # Documentation files 
    │   └── file-folder.md                  # 😉
    ├── public                              # Static files
    ├── src                                 # Source files .
    ├── ...                                 # Different config files .
    ├── CONTRIBUTION.md
    ├── LICENSE
    └── README.md

### Static files
    .
    ├── ...
    ├── public
    │   ├── fonts                           # All fonts goes here.
    │   ├── images                          # All images goes here.
    │   ├── fonts.css                       # All font imports goes here.
    │   └── index.html                      # Main and only html file.
    └── ...

### Source files
    .
    ├── ...
    ├── src
    │   ├─── components                     # Contains all the reusable and independently used components.
    │   │    └─── ExampleComponent          # Component name starts with capital letters.
    │   │         ├─── components           # Custom used compoennts.
    │   │         ├─── hooks                # Custom used hooks.
    │   │         ├─── utils                # Custom used functionality.
    │   │         ├─── index.jsx            # Main file, all imports goes here.
    │   │         └─── style.js             # Local styles.
    │   ├─── constants                      # All constants should be here.
    │   ├─── hooks                          # All reusable hooks should be here.
    │   ├─── pages                          # Contains the pages or various routes of app.  
    │   │    └─── ExamplePageComponent      # Separate components by the route. FullRouteName without slashes.
    │   │         ├─── components
    │   │         ├─── hooks
    │   │         ├─── utils
    │   │         ├─── index.jsx
    │   │         └─── style.js
    │   ├─── routes                         # Routes goes here.
    │   │    └─── index.jsx
    │   ├─── services                       # Fetch requests data goes here.
    │   │    ├─── anyService                # Main route name.
    │   │    └─── index.js
    │   ├─── store                          # Redux/toolkit store.
    │   │    ├─── slices
    │   │    │    └─── anySlice.js
    │   │    └─── index.js                  # Store configuration .
    │   ├─── utils                          # Utilities.
    │   ├─── App.jsx                        # All pages and components goes here.
    │   └─── index.jsx                      # Main jsx file.
    └─── ...
