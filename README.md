# Cron Job Schedule

## Actions

- [Live Stream](actions/workflows/live.yml)

```sh
$ curl -X 'POST'\
       -H 'Authorization: <token>' \
       -d '{"ref":"refs/heads/main","inputs":{"youtube_id":"<youtube_id>"}}' \
       'https://api.github.com/repos/nweoo22222/cron-job-schedule/actions/workflows/<id>/dispatch'
```
