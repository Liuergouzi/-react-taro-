const config = {
  projectName: 'rtt',
  date: '2023-3-9',
  designWidth: 750,
  deviceRatio: {
    640: 2.5 / 2,  //1.17
    750: 1.06,         //1
    828: 1.95 / 2   //0.905
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    // 仅 webpack5 支持依赖预编译配置
    prebundle: {
      enable: true,
    },
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    esnextModules: [/@antmjs[\\/]vantui/],
    pxtransform: {
      enable: true,
      config: {},
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    //智能提取分包
    optimizeMainPackage: {
      enable: true,
    },
    
    // addChunkPages(pages) {
    //   pages.set('subPack1/personalSetting/PersonalSetting', ['subpackages/common']),
    //   pages.set('subPack1/personaldetails/PersonalDetails', ['subpackages/common'])
    // },
 
    webpackChain: (chain, webpack) => {
      chain.merge({
        // output: {
        //   // 可以配合 npm script 和环境变量来动态修改
        //   jsonpFunction: process.env.JSONP_NAME || 'webpackJsonp',
        // },
        // optimization: {
        //   splitChunks: {
        //     cacheGroups: {
        //       subpackagesCommon: {
        //         name: 'subpackages/common',
        //         minChunks: 2,
        //         test: (module, chunks) => {
        //           const isNoOnlySubpackRequired = chunks.find((chunk) => !/\bsubpackages\b/.test(chunk.name))
        //           return !isNoOnlySubpackRequired
        //         },
        //         priority: 200,
        //       },
        //     },
        //   },
        // },
        //压缩编译指定压缩
        plugin: {
          install: {
            plugin: require('terser-webpack-plugin'),
            args: [
              {
                terserOptions: {
                  compress: true, // 默认使用terser压缩
                  // mangle: false,
                  keep_classnames: true, // 不改变class名称
                  keep_fnames: true, // 不改变函数名称
                },
              },
            ],
          },
        },
      })
    },
  },
  h5: {
    //Ui组件库默认编译
    esnextModules: [/@antmjs[\\/]vantui/],
    // router:{
    //   mode:'browser'
    // },
    pxtransform: {
      enable: true,
      config: {},
    },

    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
  plugins: ['@tarojs/plugin-html'], //使用html标签
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
