# Cron Job Schedule

```sh
$ curl -X 'POST'\
       -H 'Authorization: Bearer <token>' \
       -d '{"ref":"refs/heads/main","youtube_id":"<youtube_id>"}' \
       'https://api.github.com/repos/nweoo22222/cron-job-schedule/actions/workflows/<id>/dispatch'
```
