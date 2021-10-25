<?php
/**
 *
 * @package Theme Achick
 * @since Achick 1.0.0
 */

get_header(); ?>

<section class="content-center">
    <figure>
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/dist/images/achick.svg" alt="<?php _e("Achick - Clean minimalistic theme", "achick") ?>" width="256" height="256" alt="">
        <figcaption>
            <h1 class="text-transparent"><?php _e("Achick - Clean minimalistic theme", "achick") ?></h1>
        </figcaption>
    </figure>
</section>

<?php get_footer();