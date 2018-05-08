class Help {
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  findNextTabStop(el) {  // https://stackoverflow.com/a/29883167/3712591
    var universe = document.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])');
    var list = Array.prototype.filter.call(universe, item => item.tabIndex >= '0');
    var index = list.indexOf(el);
    return list[index + 1] || list[0];
  }

  keyNextHandler(ev) {
    if (ev.keyCode === 13) {
        ev.preventDefault();
        help.findNextTabStop(ev.target).focus();
    }
  }

  showHidePW(element) {
    element.active = !element.active;

    const input = element.parentNode.querySelector('input');
    element._type = input.type;
    const iconNode = element.querySelector('i') || element.closest('i');

    if(element.active) {
      input.type = 'text';
      iconNode.classList.remove('fa-eye');
      iconNode.classList.add('fa-eye-slash');
    } else {
      input.type = element._type;
      iconNode.classList.remove('fa-eye-slash');
      iconNode.classList.add('fa-eye');
    }
  }
}

const help = new Help();
