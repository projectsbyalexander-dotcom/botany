package io.github.projectsbyalexander.travnik;

import android.os.Bundle;
import android.webkit.WebSettings;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Крупный системный шрифт раздувал вёрстку шире экрана: ограничиваем масштаб текста 115 %
        WebSettings s = getBridge().getWebView().getSettings();
        if (s.getTextZoom() > 115) s.setTextZoom(115);
        hideStatusBar();
    }

    // Строка с часами, зарядом и уведомлениями не нужна: прячем её, она появляется по свайпу сверху и снова скрывается
    private void hideStatusBar() {
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        c.hide(WindowInsetsCompat.Type.statusBars());
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideStatusBar();
    }

    @Override
    public void onPause() {
        super.onPause();
        // приложение свернули: музыка останавливается
        getBridge().getWebView().evaluateJavascript("window.MUSIC && MUSIC.away()", null);
    }

    @Override
    public void onResume() {
        super.onResume();
        getBridge().getWebView().evaluateJavascript("window.MUSIC && MUSIC.back()", null);
    }
}
