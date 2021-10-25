<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<title><?php wp_title( '' ); ?><?php if ( wp_title( '', false ) ) { echo ' : '; } ?><?php bloginfo( 'name' ); ?></title>


        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/favicon-16x16.png">
        <link rel="manifest" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/site.webmanifest">
        <link rel="mask-icon" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/safari-pinned-tab.svg" color="#0b4ca1">
        <link rel="shortcut icon" href="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/favicon.ico">
        <meta name="msapplication-TileColor" content="#D71332">
        <meta name="msapplication-config" content="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/favicon/browserconfig.xml">
        <meta name="theme-color" content="#D71332">

		<link rel="alternate" type="application/rss+xml" title="<?php bloginfo( 'name' ); ?>" href="<?php bloginfo( 'rss2_url' ); ?>" />

        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo( 'description' ); ?>">
        
		<?php wp_head(); ?>

    </head>
    <body>

    
    