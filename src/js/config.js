const link = new Lightbox({
    selector: '.iframe',
    type: 'iframe',
});

const image = new Lightbox({
    selector: '.image',
    type: 'image',
});

const imageSettings = new Lightbox({
    selector: '.image-settings',
    type: 'image',
    title: true,
});

const videoControls = new Lightbox({
    selector: '.youtube',
    type: 'youtube',
});

const videoSettings = new Lightbox({
    selector: '.youtube-settings',
    type: 'youtube',
    title: true,
    video: {
        controls: false,
        privacyEnhanced: true,
    }
});