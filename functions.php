<?php

include "functions/disable.php";

add_action( 'wp_enqueue_scripts', 'achick_styles' );
add_action( 'wp_enqueue_scripts', 'achick_scripts' ); 

// Register CSS
function achick_styles() {
    wp_register_style( 'style-main', get_template_directory_uri() . '/assets/dist/css/main.css', array(), '1.0', '' );
    wp_enqueue_style( 'style-main' );
}

// Register JS
function achick_scripts() {
    wp_register_script( 'script-main', get_template_directory_uri() . '/assets/dist/js/main.js', array(), '1.0.0', true );
    wp_enqueue_script( 'script-main' );
}

load_theme_textdomain( 'achick', get_template_directory() . '/languages' );
