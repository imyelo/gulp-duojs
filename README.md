# gulp-duojs
> compile duojs


## Usage

```javascript
var duo = require('gulp-duojs');

gulp.task('dest.js', function () {
  gulp.src('src/index.js')
    .pipe(duo({standalone: 'foobar'}))
    .pipe(gulp.dest('./dest'));
});
```

or

```javascript
var duo = require('gulp-duojs');

gulp.task('dest.js', function () {
  gulp.src('src/index.js')
    .pipe(duo({standalone: 'foobar'}, function (Duo) {
        Duo.include('jade-runtime', ...);
    }))
    .pipe(gulp.dest('./dest'));
});
```

#### Options
[Duo Javascript API](https://github.com/duojs/duo/blob/master/docs/api.md)


**root**  
*default: process.cwd()*  

**standalone**  
*default: ''*  

**development**  
*default: false*  

**cache**  
*default: true*  

**copy**  
*default: false*  

**global**  
*default: ''*  

**concurrency**  
*default: 50*  


## LICENSE
MIT License
