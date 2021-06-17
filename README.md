# Cron Job Schedule

## Actions

- [Live Stream](https://github.com/NweOo22222/cron-job-schedule/actions/workflows/live.yml)
- [Cron Schedule](https://github.com/NweOo22222/cron-job-schedule/actions/workflows/cron.yml)
- [Upload Video](https://github.com/NweOo22222/cron-job-schedule/actions/workflows/video.yml)

## CLI Usage

```sh
curl -X 'POST'\
     -H 'Authorization: <token>'\
     -d '{"ref":"refs/heads/main","inputs":{"youtube_id":"<youtube_id>"}}'\
     https://api.github.com/repos/nweoo22222/cron-job-schedule/actions/workflows/<id>/dispatch
```
