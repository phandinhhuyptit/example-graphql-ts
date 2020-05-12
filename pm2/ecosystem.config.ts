module.exports = {
    apps: [
      {
        name: 'grabhotel_dev',
        script: './index.js',
        instances: 1,
        exec_mode: 'cluster',
        error_file: './logs/dev_err.log',
        out_file: './logs/dev_out.log',
        merge_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        max_memory_restart: '2G',
        autorestart: true,
        watch: ['src'],
      }
    ]
  }