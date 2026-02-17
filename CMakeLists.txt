# CMake project to generate embedded ClickStack resources.
#
# This project scans the out/ directory, gzips all files,
# and generates C++ code with #embed directives for all files.
#
# Usage:
#   cmake -B build
#   cmake --build build
#
# The generated header will be at: build/ClickStackResources.generated.h

cmake_minimum_required(VERSION 3.25)

project(ClickStackResources
    VERSION 1.0
    DESCRIPTION "Embedded web resources for ClickStack"
    LANGUAGES CXX
)

# Check for required tools
find_program(GZIP_EXECUTABLE gzip REQUIRED)

# Set clickstack source directory (uncompressed files)
set(CLICKSTACK_SOURCE_DIR "${PROJECT_SOURCE_DIR}/out")

# Check if directory exists
if(NOT EXISTS "${CLICKSTACK_SOURCE_DIR}")
    message(FATAL_ERROR "ClickStack source directory not found at ${CLICKSTACK_SOURCE_DIR}")
endif()

# Set clickstack directory for gzipped files in build directory
set(CLICKSTACK_DIR "${PROJECT_BINARY_DIR}/clickstack_compressed")
file(MAKE_DIRECTORY "${CLICKSTACK_DIR}")

# Gzip all files from source directory to gzipped directory
file(GLOB_RECURSE source_files RELATIVE "${CLICKSTACK_SOURCE_DIR}" "${CLICKSTACK_SOURCE_DIR}/*")

foreach(file ${source_files})
    if(NOT IS_DIRECTORY "${CLICKSTACK_SOURCE_DIR}/${file}")
        # Create parent directory structure
        get_filename_component(file_dir "${file}" DIRECTORY)
        if(file_dir)
            file(MAKE_DIRECTORY "${CLICKSTACK_DIR}/${file_dir}")
        endif()

        # Gzip the file
        set(source_path "${CLICKSTACK_SOURCE_DIR}/${file}")
        set(dest_path "${CLICKSTACK_DIR}/${file}.gz")

        execute_process(
            COMMAND "${GZIP_EXECUTABLE}" -c "${source_path}"
            OUTPUT_FILE "${dest_path}"
            RESULT_VARIABLE gzip_result
        )

        if(NOT gzip_result EQUAL 0)
            message(FATAL_ERROR "Failed to gzip ${file}")
        endif()
    endif()
endforeach()

# Generated file goes in this project's build directory
set(GENERATED_FILE "${PROJECT_BINARY_DIR}/ClickStackResources.generated.h")

# Compute relative path from generated file location to clickstack dir for #embed directives
get_filename_component(generated_dir "${GENERATED_FILE}" DIRECTORY)
file(RELATIVE_PATH CLICKSTACK_DIR_RELATIVE "${generated_dir}" "${CLICKSTACK_DIR}")

# Function to determine MIME type from file extension
function(get_mime_type filename output_var)
    # Strip .gz extension if present to get the real file type
    string(REGEX REPLACE "\\.gz$" "" filename_no_gz "${filename}")
    string(REGEX MATCH "\\.[^.]*$" ext "${filename_no_gz}")
    string(TOLOWER "${ext}" ext_lower)

    if(ext_lower STREQUAL ".html" OR ext_lower STREQUAL ".htm")
        set(${output_var} "text/html; charset=UTF-8" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".js" OR ext_lower STREQUAL ".mjs")
        set(${output_var} "application/javascript; charset=UTF-8" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".css")
        set(${output_var} "text/css; charset=UTF-8" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".json")
        set(${output_var} "application/json; charset=UTF-8" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".png")
        set(${output_var} "image/png" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".jpg" OR ext_lower STREQUAL ".jpeg")
        set(${output_var} "image/jpeg" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".svg")
        set(${output_var} "image/svg+xml" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".woff")
        set(${output_var} "font/woff" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".woff2")
        set(${output_var} "font/woff2" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".ico")
        set(${output_var} "image/x-icon" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".webp")
        set(${output_var} "image/webp" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".txt")
        set(${output_var} "text/plain; charset=UTF-8" PARENT_SCOPE)
    elseif(ext_lower STREQUAL ".xml")
        set(${output_var} "application/xml; charset=UTF-8" PARENT_SCOPE)
    else()
        set(${output_var} "application/octet-stream" PARENT_SCOPE)
    endif()
endfunction()

# Start generating the header file
set(output_content "// Auto-generated file - DO NOT EDIT\n")
string(APPEND output_content "// Generated from: ${CLICKSTACK_DIR_RELATIVE}\n\n")
string(APPEND output_content "#pragma once\n")
string(APPEND output_content "#include <array>\n")
string(APPEND output_content "#include <string_view>\n\n")
string(APPEND output_content "namespace DB::ClickStack\n{\n\n")
string(APPEND output_content "struct EmbeddedResource\n")
string(APPEND output_content "{\n")
string(APPEND output_content "    std::string_view path;\n")
string(APPEND output_content "    const unsigned char* data;\n")
string(APPEND output_content "    size_t size;\n")
string(APPEND output_content "    std::string_view mime_type;\n")
string(APPEND output_content "};\n\n")

# Recursively find all files
file(GLOB_RECURSE all_files RELATIVE "${CLICKSTACK_DIR}" "${CLICKSTACK_DIR}/*")

# Filter out directories (only keep files)
set(resource_files "")
foreach(file ${all_files})
    if(NOT IS_DIRECTORY "${CLICKSTACK_DIR}/${file}")
        list(APPEND resource_files "${file}")
    endif()
endforeach()

# Sort files for consistent output
list(SORT resource_files)

# Generate #embed directives for each file
set(resource_count 0)
set(resource_array_entries "")

foreach(file ${resource_files})
    math(EXPR resource_count "${resource_count} + 1")

    set(var_name "resource_${file}")
    string(REGEX REPLACE "[^a-zA-Z0-9_]" "_" var_name "${var_name}")
    string(REGEX REPLACE "__+" "_" var_name "${var_name}") # Replace consecutive underscores with single underscore to avoid reserved identifiers

    # Get relative path for #embed directive (with .gz extension)
    set(relative_path "${CLICKSTACK_DIR_RELATIVE}/${file}")

    # Strip .gz extension from the resource path for lookup
    string(REGEX REPLACE "\\.gz$" "" file_no_gz "${file}")

    # Get MIME type
    get_mime_type("${file}" mime_type)

    # Generate #embed directive with relative path (includes .gz)
    string(APPEND output_content "// Resource: ${file_no_gz}\n")
    string(APPEND output_content "constexpr unsigned char ${var_name}[] = {\n")
    string(APPEND output_content "#embed \"${relative_path}\"\n")
    string(APPEND output_content "};\n\n")

    # Add entry to resource array (will be added later)
    # Use file_no_gz for the path so lookups work without .gz extension
    # Escape quotes in path and mime type for C++ string literals
    string(REPLACE "\\" "\\\\" file_escaped "${file_no_gz}")
    string(REPLACE "\"" "\\\"" file_escaped "${file_escaped}")
    string(REPLACE "\\" "\\\\" mime_escaped "${mime_type}")
    string(REPLACE "\"" "\\\"" mime_escaped "${mime_escaped}")

    string(APPEND resource_array_entries "    EmbeddedResource{\n")
    string(APPEND resource_array_entries "        \"${file_escaped}\",\n")
    string(APPEND resource_array_entries "        ${var_name},\n")
    string(APPEND resource_array_entries "        sizeof(${var_name}),\n")
    string(APPEND resource_array_entries "        \"${mime_escaped}\"\n")
    string(APPEND resource_array_entries "    }")

    # Add comma if not last element
    list(LENGTH resource_files total_files)
    if(NOT resource_count EQUAL total_files)
        string(APPEND resource_array_entries ",\n")
    else()
        string(APPEND resource_array_entries "\n")
    endif()
endforeach()

# Generate struct and array
string(APPEND output_content "constexpr std::array embedded_resources = {\n")
string(APPEND output_content "${resource_array_entries}")
string(APPEND output_content "};\n\n")
string(APPEND output_content "}\n")

# Write the generated file
file(WRITE "${GENERATED_FILE}" "${output_content}")

# Create an interface library that can be consumed by other projects
add_library(clickstack_resources INTERFACE)
target_include_directories(clickstack_resources INTERFACE
    "${PROJECT_BINARY_DIR}"
)
target_compile_features(clickstack_resources INTERFACE cxx_std_23)

# Status message
message(STATUS "Generated ClickStack resources header: ${GENERATED_FILE}")
message(STATUS "  Source files: ${resource_count}")
message(STATUS "  Namespace: DB::ClickStack")
