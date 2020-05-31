export function ClassList(elem: any) {
  var cl = elem.classList;

  if (cl) {
    return cl;
  }

  var classList: any = {
    add: add,
    remove: remove,
    contains: contains,
    toggle: toggle,
    toString: $toString,
    length: 0,
    item: item,
  };

  return classList;

  function add(token: any) {
    var list = getTokens();
    if (list.indexOf(token) > -1) {
      return;
    }
    list.push(token);
    setTokens(list);
  }

  function remove(token: any) {
    var list = getTokens(),
      index = list.indexOf(token);

    if (index === -1) {
      return;
    }

    list.splice(index, 1);
    setTokens(list);
  }

  function contains(token: any) {
    return getTokens().indexOf(token) > -1;
  }

  function toggle(token: any) {
    if (contains(token)) {
      remove(token);
      return false;
    } else {
      add(token);
      return true;
    }
  }

  function $toString() {
    return elem.className;
  }

  function item(index: any) {
    var tokens = getTokens();
    return tokens[index] || null;
  }

  function getTokens() {
    var className = elem.className;

    return filter(className.split(" "), isTruthy);
  }

  function setTokens(list: any) {
    var length = list.length;

    elem.className = list.join(" ");
    classList.length = length;

    for (var i = 0; i < list.length; i++) {
      classList[i] = list[i];
    }

    delete list[length];
  }
}

function filter(arr: any, fn: any) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) ret.push(arr[i]);
  }
  return ret;
}

function isTruthy(value: any) {
  return !!value;
}
