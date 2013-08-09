module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'src',
                    keepalive: true
                }
            },
            e2e: {
                options: {
                    port: 9002,
                    base: 'src'
                }
            }
        },
        
        karma: {
            unit: {
                configFile: 'test/unit/karma.conf.js',
                autoWatch: true
            },
            'unit-single': {
                configFile: 'test/unit/karma.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'test/e2e/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('default', []);
    grunt.registerTask('unit', ['karma:unit']);
    grunt.registerTask('unit-single', ['karma:unit-single']);
    grunt.registerTask('e2e', ['connect:e2e', 'karma:e2e']);
    grunt.registerTask('server', ['connect:server']);
};