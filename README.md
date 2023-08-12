# UWI-NCB Agile Scrum Cycle 8 & 9 Assignment

## API Setup

- Create virtual environment
```bash
python -m venv env
```

- Install requirements
```bash
pip install -r requirements.txt
```

- Run Server
```bash
python run.py
```

### Database Migrations
- Check for changes and make new migration file
```bash
flask db migrate
```

- Sync changes to the database
```bash
flask db upgrade
```

- Revert database changes to previous state
```bash
flask db downgrade
```

## CI/CD
- Using pre-commit hook for file auto-formatting
