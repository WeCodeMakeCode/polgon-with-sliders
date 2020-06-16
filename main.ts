controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    right_or_left(1)
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    radius_up_and_down(-1)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    radius_up_and_down(-1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    active_slider.selected = false
    if (active_slider == slider_sides) {
        active_slider = slider_color
    } else if (active_slider == slider_color) {
        active_slider = slider_starting_angle
    } else {
        active_slider = slider_sides
    }
    active_slider.selected = true
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    right_or_left(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (active_slider.thumb_text.isEmpty()) {
        active_slider.thumb_text = active_slider.data
    } else {
        active_slider.thumb_text = ""
    }
})
function right_or_left (inc: number) {
    if (active_slider == slider_sides) {
        active_slider.value += inc
        slider_starting_angle.value = 0
        myPolygon.sides = Math.min(Math.max(myPolygon.sides + inc, 3), 30)
        myPolygon.sprite.say(myPolygon.type, 500)
    } else if (active_slider == slider_color) {
        active_slider.value += inc
        myPolygon.color += inc
        myPolygon.color = (myPolygon.color + inc) % 15
    } else {
        myPolygon.angle += inc * speed
        active_slider.value = myPolygon.angle
    }
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    radius_up_and_down(1)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    right_or_left(1)
})
function radius_up_and_down (amount: number) {
    slider_radius.value = Math.min(Math.max(myPolygon.radius + amount, 10), 50)
    myPolygon.radius = slider_radius.value
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    radius_up_and_down(1)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    right_or_left(-1)
})
function position_horizontal_sliders (width: number) {
    slider_between = (160 - 3 * width) / 4
    this_left = slider_between
    slider_sides.left = this_left
    this_left = this_left + (width + slider_between)
    slider_color.left = this_left
    this_left = this_left + (width + slider_between)
    slider_starting_angle.left = this_left
}
let this_left = 0
let slider_between = 0
let myPolygon: Polygon = null
let active_slider: Slider = null
let slider_radius: Slider = null
let slider_color: Slider = null
let slider_starting_angle: Slider = null
let slider_sides: Slider = null
let speed = 0
speed = 20
let slider_width = 40
slider_sides = slider.create(3, 3, 30, slider_width, 6)
slider_starting_angle = slider.create(0, 0, 360, slider_width, 6)
slider_color = slider.create(6, 1, 15, slider_width, 6)
slider_radius = slider.create(20, 10, 50, 6, 60, Orientation.Vertical)
slider_radius.left = 6
slider_sides.data = "sides"
slider_starting_angle.data = "starting angle"
slider_color.data = "color"
slider_sides.selected = true
position_horizontal_sliders(slider_width)
active_slider = slider_sides
myPolygon = polygon.createPolygon(slider_sides.value, slider_radius.value, slider_color.value, slider_starting_angle.value)
