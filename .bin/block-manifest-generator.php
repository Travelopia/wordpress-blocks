<?php
/**
 * Block Manifest Generator.
 *
 * @package wordpress-blocks
 */

// Theme info.
$theme_dir       = dirname( __DIR__ );
$_cache_file     = dirname( __DIR__ ) . '/node_modules/.cache/blocks-info.json';
$blocks_dir      = dirname( __DIR__ ) . '/src/editor/blocks';
$blocks_manifest = dirname( __DIR__ ) . '/dist/blocks.php';

// Iterator to get all the block bootstrap files.
$files_iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( dirname( __DIR__ ) . '/src/editor/blocks' ) );

// Namespace to block relative path mapping.
$blocks_mapping = [];

// Get local cache.
$cache = read_cache( $_cache_file );

// Loop through the iterator.
foreach ( $files_iterator as $file ) {
	if ( $file->getFilename() !== 'index.php' ) {
		continue;
	}

	// Get the block info.
	$block              = $file->getPath();
	$block_file         = $block . '/index.php';
	$file_modified_time = filemtime( $block_file );
	$block_path         = str_replace( $theme_dir . '/', '', $block ) . '/index.php';

	// If the block file is already in cache and the file is not modified, skip.
	if ( isset( $cache[ $block_file ] ) && $cache[ $block_file ]['mtime'] === $file_modified_time ) {
		$blocks_mapping[ $block_path ] = $cache[ $block_file ]['namespace'];
		continue;
	}

	// Tokenize the file to get the namespace.
	$tokens = token_get_all( file_get_contents( $block . '/index.php' ) );

	// Store the namespace.
	$namespace = '';

	// Loop through the tokens to get the namespace.
	foreach ( $tokens as $token ) {
		// If the token is a namespace token, store the namespace.
		// @see: <https://www.php.net/manual/en/tokens.php#constant.t-name-qualified>.
		if ( T_NAME_QUALIFIED === $token[0] ) {
			$namespace = $token[1];
			break;
		}
	}

	// Bail with error if namespace not found.
	if ( empty( $namespace ) ) {
		logger( 'Error: Namespace not found in ' . $block_path, 'e' );
		continue;
	}

	// Add the namespace to the mapping.
	$blocks_mapping[ $block_path ] = $namespace;

	// Update cache.
	$cache[ $block_file ] = [
		'namespace' => $namespace,
		'mtime'     => $file_modified_time,
	];
}

// If manifest path not exists, create it recursively.
if ( ! file_exists( dirname( $blocks_manifest ) ) ) {
	mkdir( dirname( $blocks_manifest ), 0755, true );
}

// Add the manifest comment.
$manifest_comment = <<<EOT
<?php
/**
 * Warning: This is an auto-generated file. Do not modify this file directly.
 */
EOT;

// Write the manifest file.
file_put_contents( $blocks_manifest, $manifest_comment . PHP_EOL . PHP_EOL . 'return ' . var_export( $blocks_mapping, true ) . ';' );

// Log the success message.
logger( 'Success: Blocks manifest file updated.', 's' );

// Write cache.
write_cache( $_cache_file, $cache );

// Helpers.
// Logger function.
function logger( $message, $type = 'i' ) {
	$message = match ( $type ) {
		'e' => "\033[31m$message \033[0m\n", // error
		's' => "\033[32m$message \033[0m\n", // success
		'w' => "\033[33m$message \033[0m\n", // warning
		'i' => "\033[36m$message \033[0m\n", // info
		default => $message,
	};

	echo $message;
}

// Read cache file.
function read_cache( $cache_file ) {
	if ( ! file_exists( $cache_file ) ) {
		return [];
	}

	return json_decode( file_get_contents( $cache_file ), true );
}

// Write cache file.
function write_cache( $cache_file, $data ) {
	if ( ! file_exists( dirname( $cache_file ) ) ) {
		mkdir( dirname( $cache_file ), 0755, true );
	}

	file_put_contents( $cache_file, json_encode( $data, JSON_PRETTY_PRINT ) );
}
