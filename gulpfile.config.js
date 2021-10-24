// Directory
const directory = {
    source: './assets/src',
    dist: './assets/dist'
};

const path = {
    wordpress:{
        php: './**/*.php',
        translationFile: './languages/achick.pot'
    },
    css: {
        sass: directory.source + '/scss/*.scss',
        all: [directory.source + '/css/**/*.css'],
        dist: directory.dist + '/css/'
    },
    js: {
        all: [directory.source + '/js/**/*.js'],
        dist: directory.dist + '/js/'
    },
    images: {
        source: directory.source + '/images/**/*.{gif,jpg,png,svg}', 
        dist: directory.dist + '/images/',
    },
    favicon: {
        source: directory.source + '/favicon/**/*.{png,webmanifest,xml,ico,svg}',
        dist: directory.dist + '/images/favicon/',
    },
    fonts: {
        source: directory.source + '/fonts/**/*.{eot,svg,ttf,woff,woff2}',
        dist: directory.dist + '/fonts/',
    }
};

// Javascript Plugins & Libraries
const components = {
    css: [
        directory.source + '/vendor/css/**/*.css',
    ],
    js:[
        directory.source + '/vendor/js/**/*.js'
    ]
};

// Config enviroments

const enviroments = {
    browserSync:{
        projectURL : "achick.enlabe.local",
        browserAutoOpen : false,
        injectChanges : true,
        watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir'],
    },
    includePaths:['node_modules'],
    browser:['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'],
    language:{
        textDomain:'achick',
        packageName:'Theme Achick'
    }
}

module.exports = {
	directory,
	path,
	components,
	enviroments
};
