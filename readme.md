# OULIK #

![Version](https://img.shields.io/npm/v/oulik.svg)
[![Build Status](https://travis-ci.org/Memeplexx/oulik.svg?branch=master)](https://travis-ci.org/Memeplexx/oulik.svg?branch=master)
![Coverage Status](https://coveralls.io/repos/github/Memeplexx/oulik/badge.svg?branch=master)
![Package Size](https://badgen.net/bundlephobia/minzip/oulik)
![Dependency count](https://badgen.net/bundlephobia/dependency-count/oulik)

### ***Compact, transparent, typesafe, in-line state-management*** ###
---
## WHAT PROBLEMS DOES THIS LIBRARY TRY TO SOLVE? ##
Current state management solutions are typically characterized by:
* convoluted immutable state updates inside reducers,
* actions which do nothing more than needless re-describe simple updates,
* actions that fail to describe updates accurately.  
Oulik is designed to address all these issues by exposing an API that allows it to make and describe your state updates for you (generating actions on your behalf). Setup is simple, while integration with the [Redux Devtools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) is done for you.

---

> **NOTE:** The rest of this guide illustrates how to use Oulik **without a framework.** It may be more appropriate for you to check out the docs for the following framework bindings:  

![](assets/react.ico) <u>[OULIK-REACT](./docs/readme-react.md)</u>  
![](assets/angular.png) <u>[OULIK-NG](./docs/readme-ng.md)</u>  

## GETTING STARTED ##

```console
npm install oulik
```
```Typescript
import { make } from 'oulik';

const store = make('my store', {         // <- Auto-registers with the Redux Devtools Extension.
  user: { firstname: '', lastname: '' }, // <- Initial state must be serializable. It can be a
  hobbies: new Array<string>(),          //    simple primitive, or something far more nested.
});       
```

## WRITING STATE ##
```Typescript
store(s => s.user.firstname)             // <- Your state will be efficiently replaced using the action:
  .replaceWith('James');                 //    { type: 'user.firstname.replaceWith()', payload: 'James' }
```
[All write options...](./docs/readme-write.md)

## READING STATE ##

```Typescript
const username = store(s => s.user.firstname)
  .read();
```
[All read options...](./docs/readme-read.md)