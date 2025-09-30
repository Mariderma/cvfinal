from django.shortcuts import render

def home(request):
    return render(request, 'core/home.html')


def contactame(request):
    from .forms import ContactMessageForm
    form = ContactMessageForm(request.POST or None)
    success = False
    if request.method == 'POST':
        if form.is_valid():
            # server-side basic security already in form (honeypot)
            form.save()
            success = True
        else:
            # form will contain errors visible in the template
            success = False
    return render(request, 'core/contactame.html', {'form': form, 'success': success})


def fyq(request):
    # static template for FAQ; later this will be backed by a CMS model
    return render(request, 'core/fyq.html')


def open_list(request):
    # Read characters from the database; admin can add/edit/delete them.
    from .models import Character
    characters = Character.objects.all()
    return render(request, 'core/open.html', {'characters': characters})


def open_detail(request, slug):
    from .models import Character
    from django.shortcuts import get_object_or_404
    character = get_object_or_404(Character, slug=slug)
    return render(request, 'core/open_detail.html', {'character': character})
 
