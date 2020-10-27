const link = new Lightbox({
    selector: '.iframe',
    type: 'iframe',
});

const image = new Lightbox({
    selector: '.image',
    type: 'image',
});

const videoControls = new Lightbox({
    selector: '.youtube',
    type: 'youtube',
});

const videoSettings = new Lightbox({
    selector: '.youtube-settings',
    type: 'youtube',
    video: {
        controls: false,
        privacyEnhanced: true,
    }
});