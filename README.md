# Lightbox
Lightbox is small javascript library used to overlay images/films/websites on top of the current page.

### See how it works
[Example](https://lightbox.mgrabowski.eu/){:target="_blank"}

## How to start
Download `lightbox.css` `lightbox.js` files and use in your project.

### CSS Styles
```html
<head>
	<link rel="stylesheet" href="src/css/lightbox.css">
</head>
```
### Create a link
```html
<a class="iframe" href="https://air.mgrabowski.eu">iframe</a>
```

### Initialize Lightbox
```javascript
import Lightbox from '/src/js/lightbox.js'
 
const link = new Lightbox({
 	selector: '.iframe',
 	type: 'iframe',
});
```

## Lightbox parameters
### Required
| parameter        | Type           | Default  | Description |
| :---------------: |:-------------:| :--------:|:-------------|
| selector | string | | Select HTML initialization tag using CSS selectors |
| type | string | | Specify the type of content by choosing between: `image`  `iframe`  `youtube` |

### Optional
| parameter        | Type           | Default  | Description |
| :---------------: |:-------------:| :--------:|:-------------|
| title | boolean | false | Add a title under the lightbox. Default value is the file url, can be changed to data-title tag attribute |
```html
<a  data-title="This is your new title."></a>
```
#### Youtube options
| parameter        | Type           | Default  | Description |
| :---------------: |:-------------:| :--------:|:-------------|
| video | object |  | Allows to set options for video |
| controls | boolean | true  | Display video player controls |
| privacyEnhanced | boolean | false  | Privacy Enhanced Mode allows you to embed YouTube videos without using cookies that track viewing behavior. This means no activity is collected to personalize the viewing experience. Instead, video recommendations are contextual and related to the current video. |
```javascript
const video = new Lightbox({
    selector: '.youtube',
    type: 'youtube',
    video: {
    	controls: false,
    	privacyEnhanced: true,
    }
});
```
