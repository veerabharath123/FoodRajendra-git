function spinner(flag) {
    if (flag) {
        $('.spinner-bg').removeClass('d-none')
    }
    else {
        $('.spinner-bg').removeClass('d-none').addClass('d-none')
    }
}